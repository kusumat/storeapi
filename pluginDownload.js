const fs = require('fs'),
    needle = require('needle'),
    xml2js = require('xml2js'),
    admzip = require('adm-zip'),
    path = require('path'),
    baseUrl = 'http://download.kony.com/visualizer_enterprise/80/',
    parser = new xml2js.Parser(),
    UTF8 = 'utf8';

var pluginsLocation,
    downloadTempLocation,
    proxyParam;

var ns = {};

(function(ns) {

    /**
    * Download required file from the given url.
    * @param {Object} params
    * @param {String} params.url - url of the file to download
    * @param {String} params.filename - path to download file.
    * @param {Function} cb - callback function
    */
    function downloadFile(params, cb) {
        var tempFile = path.resolve(downloadTempLocation, path.basename(params.filename));

        try {
            var outStream = fs.createWriteStream(tempFile),
                data,
                streamObj,
                reqOptions = {
                    decode : false,
                    parse : false,
                    follow_max : 10
                };

            if(proxyParam) {
                reqOptions.proxy = proxyParam;
            }
            
            streamObj = needle.get(params.url, reqOptions, function(error, response) {
                if(error) {
                    outStream.close();
                    cb('Error while downloading plugins: ' + JSON.stringify(error, null, 4));
                    return;
                }
                var pluginID = params.pluginID || path.basename(params.filename);

                if(response.statusCode !== 200) {
                    console.error(`Download failed '${pluginID}' response code: ${response.statusCode}`);
                    outStream.close();
                    cb('Error while downloading file'); 
                } else {
                    outStream.end();
                    console.log('Download finished :', pluginID);
                    fs.rename(tempFile, params.filename, function(err) {
                        if (err) {
                            console.error('Error while moving file', err);
                            cb('Error while moving file ' + err);
                        } else {
                            cb();   
                        }
                    }); 
                }
            });

            streamObj.on('readable', function() {
                while(data = this.read()) {
                    outStream.write(data);
                }
            });

            streamObj.on('error', function(error) {
                outStream.close();
                cb(error);
            });

        } catch(e) {
            console.error('Exception while downloading file', e);
            cb(e);            
        }
    }

    /**
    * Parse site.xml and download features plugins from site.xml file.
    * @param {Object} params
    * @param {String} params.filename - path to site.xml file
    * @param {Function} cb - callback function
    */
    function downloadFeaturesPlugin(params, cb) {
        var data = fs.readFileSync(params.filename, UTF8);

        parser.parseString(data, function(error, result) {
            if (error) {
                cb(error);
                return;
            }

            var filePath = result.site.feature[0].$.url,
                jarFileName = filePath.replace('features/', ''),
                jarFilePath = path.resolve(params.tempLocation, jarFileName),
                jarFileUrl = baseUrl.replace('8.', '8');
                jarFileUrl = jarFileUrl.concat(filePath);
                
            var data = {
                'url' : jarFileUrl,
                'filename' : jarFilePath,
                'pluginID' : result.site.feature[0].$.id + ' (features plugin)'
            };
            downloadFile(data, function(error) {
                if (error) {
                    cb(error);
                } else {
                    var unzipper = new admzip(path.resolve(jarFilePath));
                    unzipper.extractAllTo(params.tempLocation, true);
                    cb();
                }
            });
            
        });
    }

    /**
    * Parse feature.xml and download required plugins from feature.xml file.
    * @param {Object} params
    * @param {String} params.featureXmlFilePath - path to feature.xml file
    * @param {Function} cb - callback function
    */
    function downloadDependentPlugins(params, cb) {
        var data = fs.readFileSync(params.featureXmlFilePath, UTF8);
        parser.parseString(data, function(error, result) {
            try {
                if (error) {
                    cb(error);
                    return;
                }

                var pluginsList = result.feature.plugin,
                    promises = [],
                    entries = fs.readdirSync(path.resolve(params.pluginsLocation));

                pluginsList.forEach(function(plugin) {
                    if(plugin) {
                        promises.push(new Promise(function(resolve, reject) {
                            var pluginID = plugin.$.id,
                                pluginFileName = pluginID + "_" + plugin.$.version + ".jar";
                            
                            var data = {
                                    'url' : baseUrl + 'plugins/' + pluginFileName,
                                    'filename' : path.resolve(params.pluginsLocation, pluginFileName),
                                    'pluginID' :  pluginID
                                };

                            if(entries.indexOf(pluginFileName) >= 0) {
                                resolve();
                            } else {
                                var oldPluginJarName = entries.find(function(entry) {
                                        return entry.startsWith(pluginID);
                                    });

                                if(oldPluginJarName) {
                                    fs.unlinkSync(path.resolve(params.pluginsLocation, oldPluginJarName));
                                }

                                downloadFile(data, function(err) {
                                    if(err) {
                                        resolve({error: err, pluginID: pluginID});  
                                    } else {
                                        resolve();
                                    }
                                });
                            }
                        }));
                    }
                });

                Promise.all(promises).then(function(result) {
                    cb({data : result});
                }).catch(err => {
                    cb({error : `Error while downloading plugins reason : ${err}, please retry.`});
                });
            } catch (e) {
                cb({error : `Error while downloading plugins reason : ${e}, please retry.`});
            }
        });
    }

    function __assertDirRecursively__(dirPath, should) {
        if (fs.existsSync(dirPath)) {
            return;
        } else {
            if (should) {
                throw new Error('Should have existed: ' + dirPath);
            } else {
                try {
                    fs.mkdirSync(dirPath);
                } catch(e) {
                    if(e.code === "ENOENT") {
                        __assertDirRecursively__(path.dirname(dirPath));
                        __assertDirRecursively__(dirPath);
                    }
                }
            }
        }
    }

    // start method to download all plugins.
    function downloadKonyPlugins(args, cb) {
        pluginsLocation = args.pluginsLocation;

        var version = args.version,
            tempLocation = path.resolve(pluginsLocation, '__temp'),
            pluginVersionFilePath = path.resolve(pluginsLocation, 'pluginversion.json');

        
        if(fs.existsSync(pluginVersionFilePath)) {
            var pluginVersion = JSON.parse(fs.readFileSync(pluginVersionFilePath)),
                fixPackVersion = pluginVersion.fixPackVersion;

            if(fixPackVersion === version) {
                console.log('fix version already exists in given', pluginsLocation, 'location.');
                cb({cleanBundles : false});
                return;
            }
        }

        console.log('Plugins download has started...');

        downloadTempLocation = path.resolve(tempLocation, 'plugins');
        
        // Deletes temporary plugins directory if present
        if(fs.existsSync(downloadTempLocation)) {
            try {
                fs.unlinkSync(downloadTempLocation);
            } catch(e) {
                cb({error : `${e}, please retry.`});
                return;
            }
        }
        
        //creating temp directory
        __assertDirRecursively__(downloadTempLocation);

        proxyParam = args.proxyParam;

        var xmlFileName = process.platform === 'win32' ? 'site' : 'macsite', 
            siteUrl = baseUrl + xmlFileName + '-' + version + '.xml',
            siteDotXmlFilePath = path.resolve(tempLocation, xmlFileName + '-' + version + '.xml'),
            params = {
                'url' : siteUrl,
                'filename' : siteDotXmlFilePath
            };

        // Step 1: Download site.xml file from base url.

        downloadFile(params, function(error) {
            if (error) {
                var message = error.indexOf('Error while downloading plugins:') >= 0 ? 'internet connection' : 'version';
                cb({error : `${error}, please check the ${message} and retry.`});
                return;
            }

            // Step 2: Parse site.xml and download features.jar file from the site.xml file.

            params = {
                'filename' : siteDotXmlFilePath,
                'tempLocation' : tempLocation
            };

            downloadFeaturesPlugin(params, function(error) {
                if (error) {
                    cb({error : error});
                    return;
                }

                // Step 3: Parse feature.xml file and download current set of plugins.

                params = {
                    'pluginsLocation' : pluginsLocation,
                    'featureXmlFilePath' : path.resolve(tempLocation, 'feature.xml'),
                    'version' : version
                };

                downloadDependentPlugins(params, function(result) {
                    if(result.data) {
                        let data = result.data;
                        let failedItems = data.filter(item => item !== undefined);
                        
                        if (failedItems.length) {
                            var errorMsg = 'Error while downloading plugins, please retry.';
                            cb({error: errorMsg});
                            return;
                        }
                    }

                    if(result.error) {
                        cb({error : result.error});
                    } else {
                        console.log('Plugin download has been completed.');
                        var json = JSON.stringify({'fixPackVersion' : version}, null, 4);
      
                        fs.writeFile(pluginVersionFilePath, json, (err) => {
                            if(err) {
                                cb({error: err});
                            } else {
                                console.log(version + ' saved.');
                                cb({cleanBundles: true});
                            }
                        });
                    }
                });
            });
        });
    }

    ns.downloadKonyPlugins = downloadKonyPlugins;

})(ns);

module.exports = ns;