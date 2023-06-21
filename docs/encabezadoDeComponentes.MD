## Índice

* [TEMPLATE](#template)
    + [Component (user guide)](#component---user-guide)
    + [Component (technical guide)](#component---technical-guide)
    + [Functions description](#functions-description)
* [EXAMPLE](#example)
    + [Component (user guide)](#component-example---user-guide)
    + [Component (technical guide)](#component-example---technical-guide)
    + [Functions description](#functions-description-example)

# Template
# Component - user guide

## [Component name]
	
### Description  
	
[Description Details]

### Category   
	
[Visual, Structural, Functional]  

### Live demo 
	
[code to iframe CodeSandbox]

### Installation or Implementation

[example: npm install --save react-awesome-button]

### Usage 
	
[example: <protvista-tooltip>  </protvista-tooltip> ]

### Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|           |      |         |             |


### Exception

__Category: [Error, Warning or Message]__

[Description of the exception (if necessary)]

### License

MIT License

### Author 
	
RegulonDB Team: 

[full developer name]

# Component - technical guide

## Component Type 

[ Driver, Visual, Application, Custom Hook, ClassComponent ]

* Driver: It is a Component that controls interactions with users, browser, API requests, manage status or processes as well as logic related to data.
* Visual: This component will take care of the structure and styles of our application.
* Application: Application: is the main component of a web application or library.
* Custom Hook: is a custom React function, which unlike the other components can return variables.
* ClassComponent: is a traditional React component class

## Dependencies
[Dependency name][ Dependency details ]

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
| Nombre | Descripción | Sintaxis | Notas adicionales o Referncias | 
| ------ | ----------- | -------- | ------------------------------ |
|        |             |          |                                |

# Functions description

## [function name]

__Description:__  

[Description of the function]


__Usage:__

```javascript
function(Parameters, if any);
```

__Scope:__

[Scope details]

__Input Parameter:__

​__[Name]:__ [Description]

__[Name]:__ [Description]


__Return:__

​__[Type]:__ [Name]

​[Description (if necessary)]

------------

# Example
# Component example - user guide

## ContactForm
	
### Description  
	
The ContactForm component provides a contact form for users to send messages. 
It uses the emailjs library to send form submissions via email.

### Category   
	
[ Functional ]  

### Live demo 
	
[GithubPage](https://leonelvalencia.github.io/portafolio)

### Usage 

```javascript
<ContactForm />
```

### Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|           |      |         |             |

### Exception

__Category: [Error]__

### License

MIT License

### Author 
	
RegulonDB Team: 

* Leonel Valencia Estudillo <valenciaestudillo@gmail.com>
* Gabriel Alarcon carranza <galarcon@ccg.unam.mx>

# Component example - technical guide

## Component Type 

[ Driver ]

* Driver: It is a Component that controls interactions with users, browser, API requests, manage status or processes as well as logic related to data.

## Dependencies
[Dependencie name] - [ Dependencie details ]

[@emailjs/browser](https://www.emailjs.com/docs/sdk/installation/)	Library for sending emails via the browser using email templates

[./contactForm.css]()	CSS file for styling the ContactForm component

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description                                       |  Syntax  | Additional Notes or References              | 
| ------ | ------------------------------------------------- | -------- | ------------------------------------------- |
|  form	 | Reference to the HTML form element for submission |	useRef  | https://es.react.dev/reference/react/useRef |

# Functions description example

## sendEmail

__Description:__  

This function is responsible for sending the form submission via email using the emailjs library. 
It retrieves the form data, sends it using the specified service ID, template ID,
and public key, and handles the success or error response.

__Usage:__

```javascript
sendEmail(event);
```

__Scope:__

Local to the ContactForm component.

__Input Parameter:__  
​
__event:__ The form submission event.

__Return:__  

​__None__

​[Description (if necessary)]