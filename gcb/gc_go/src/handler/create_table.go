package handler


var tableStr=[]string{
	   `create table if not exists user(
	     	id int primary key auto_increment,
			username varchar(20) not null,
			password varchar(30) not null,
	    	create_time datetime not null
	    )DEFAULT character set utf8 DEFAULT COLLATE utf8_general_ci;`,

		`create table if not exists home(
			id int primary key auto_increment,
			image_url varchar(200) not null,
			create_time datetime not null
		)DEFAULT character set utf8 DEFAULT COLLATE utf8_general_ci;`,

		`create table if not exists work_duty(
			id int primary key auto_increment,
			title varchar(50) not null,
			summary varchar(200)  null,
			content text not null,
			type enum('destination','department','work','section','inner') not null, 
			create_time datetime not null
		)DEFAULT character set utf8 DEFAULT COLLATE utf8_general_ci;`,

		`create table if not exists policy(
			id int primary key auto_increment,
			title varchar(50) not null,
			summary varchar(200)  null,
			content text not null,
			type enum('country','province','school','inner') not null, 
			create_time datetime not null
		)DEFAULT character set utf8 DEFAULT COLLATE utf8_general_ci;`,

		`create table if not exists school_plan(
			id int primary key auto_increment,
			image_url varchar(200) not null,
			type enum('guangzhou','three_water') not null, 
			create_time datetime not null
		)DEFAULT character set utf8 DEFAULT COLLATE utf8_general_ci;`,

		`create table if not exists project_build(
			id int primary key auto_increment,
			title varchar(50) not null,
			summary varchar(200)  null,
			content text not null,
			type enum('plan_build','building_project') not null, 
			create_time datetime not null
		)DEFAULT character set utf8 DEFAULT COLLATE utf8_general_ci;`,

		`create table if not exists work_status(
			id int primary key auto_increment,
			title varchar(50) not null,
			summary varchar(200)  null,
			content text not null,
			create_time datetime not null
		)DEFAULT character set utf8 DEFAULT COLLATE utf8_general_ci;`,

		`create table if not exists item_manager(
			id int primary key auto_increment,
			image_url varchar(200) not null,
			create_time datetime not null
		)DEFAULT character set utf8 DEFAULT COLLATE utf8_general_ci;`}


func CreateTable(){

	for _,v := range tableStr {
		res :=Query(v)
		p(res)
	}
}