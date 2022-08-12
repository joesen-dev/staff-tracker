DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    department_id INT,
    salary DECIMAL NOT NULL,
    CONSTRAINT fk_department    
    FOREIGN KEY (department_id) 
    REFERENCES departments(id) 
    ON UPDATE CASCADE
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30)NOT NULL,
    role_id INT,
    manager_id INT,
    CONSTRAINT fk_role 
    FOREIGN KEY (role_id) 
    REFERENCES roles(id) ON UPDATE CASCADE,

    CONSTRAINT fk_manager 
    FOREIGN KEY (manager_id) 
    REFERENCES employees(id) ON UPDATE CASCADE
);

