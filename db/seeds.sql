INSERT INTO emplyee (id, name) 
VALUE (2, "Engineering"), 
(3, "Finance"),
(4, "Legal"),
(1, "Sales");

INSERT INTO role (title, department_id, salary) 
VALUE ("Sales Lead", 1 100000),
("Salesperson", 1, 80000),
("Lead Engineer", 2, 150000),
("Software Engineer", 2, 120000),
("Account Manager", 3, 160000),
("Accountant", 3, 125000),
("Legal Team Lead", 4, 250000),
("Lawyer", 4, 190000);

INSERT INTO  emplyee (first_name, last_name, role_id, manager_id)
VALUE ("John", "Doe", 1, null),
("Mike", "Chan", 2, 1),
("Ashley", "Rodriguez", 3, null),
("Kevin", "Tupik", 4, 3),
("Kunal", "Singh", 5, null),
("Malia", "Brown", 6, 5),
("Sarah", "Lourd", 7, null),
("Tom", "Allen", 8, 7);
