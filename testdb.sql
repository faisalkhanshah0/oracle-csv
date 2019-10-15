create table customers(customer_id number(10) NOT NULL, customer_name varchar2(50) NOT NULL, customer_surname varchar2(20), age number(3), gender varchar2(6), CONSTRAINT customers_pk PRIMARY KEY (customer_id));

INSERT INTO customers(customer_id, customer_name, customer_surname, age, gender)VALUES(1,'John','Snow',25,'M');
INSERT INTO customers(customer_id, customer_name, customer_surname, age, gender)VALUES(2,'Clair','White',21,'F');
INSERT INTO customers(customer_id, customer_name, customer_surname, age, gender)VALUES(3,'Fancy','Brown',78,'F');
INSERT INTO customers(customer_id, customer_name, customer_surname, age, gender)VALUES(4, 'Mark','Will',50,'M');
INSERT INTO customers(customer_id, customer_name, customer_surname, age, gender)VALUES(5, 'Mercy','Willson',33,'F');
INSERT INTO customers(customer_id, customer_name, customer_surname, age, gender)VALUES(6, 'Will','Smith',35,'M');
INSERT INTO customers(customer_id, customer_name, customer_surname, age, gender)VALUES(7, 'Ronaldo','Smith',30,'M');
