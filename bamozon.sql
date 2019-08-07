DROP DATABASE IF EXISTS bamazon;

create database bamazon;

use bamazon;

create table products (
	item_id INT not null auto_increment,
    product_name varchar (55) not null,
    department_name varchar (55) not null,
    price decimal (10,2) not null,
    stock_quantity varchar (10) not null,
    primary key (item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
values ("Bluetooth Speaker", "electronics", 44.99, 100);

insert into products (product_name, department_name, price, stock_quantity)
values ("Desk Lamp", "bedroom", 29.99, 89);

insert into products (product_name, department_name, price, stock_quantity)
values ("Dresser", "bedroom", 133.34, 40);

insert into products (product_name, department_name, price, stock_quantity)
values("MacBook", "computers", 1199.99, 50);

insert into products (product_name, department_name, price, stock_quantity)
values ("Headphones", "electronis", 89.95, 150);

insert into products (product_name, department_name, price, stock_quantity)
values ("Fender Stratocaster", "musical instruments", 949.45, 35);

insert into products (product_name, department_name, price, stock_quantity)
values ("Gibson SG", "musical instruments", 1195.99, 20);

insert into products (product_name, department_name, price, stock_quantity)
values ("Tower Fan", "electronics", 48.42, 200);

insert into products (product_name, department_name, price, stock_quantity)
values ("Espresso Machine", "home & kitchen", 248.99, 35);

insert into products (product_name, department_name, price, stock_quantity)
values ("Turn Table", "cd & turntable", 145.95, 50);

