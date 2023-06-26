DROP TRIGGER IF EXISTS projects_create_date;
DROP TRIGGER IF EXISTS projects_update_date;
DROP TRIGGER IF EXISTS project_parts_create_date;
DROP TRIGGER IF EXISTS project_parts_update_date;


ALTER TABLE `projects`
  DROP FOREIGN KEY `FK_projects_accounts`;

ALTER TABLE `project_parts`
  DROP FOREIGN KEY `FK_part_project_id`;

drop table `projects`;
drop table `project_parts`;

-- adding not null constraint for guid columns so that db2 allows unique index
alter table `applications` modify column `application_guid` varchar(45) not null;
alter table `accounts` modify column `account_guid` varchar(45) not null;
alter table `environments` modify column `environment_guid` varchar(45) not null;