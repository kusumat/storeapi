<%@ page import="java.io.*" %>
<%! 
String conf= ""; 
public void jspInit() {
	try{
		File file = new File("/jfslocal/appconfig/hatskony/hatskonyconfig.properties"); 
		BufferedReader br = new BufferedReader(new FileReader(file)); 
		String st; 
		while ((st = br.readLine()) != null) 
			conf = conf + st;
		br.close();
	}
	catch(Exception e){e.printStackTrace();}
}
%>

<%
out.println(conf.trim()); 
%>