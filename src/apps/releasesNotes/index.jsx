/**
# Component (user guide)

# [Component name]
	
## Description  
	
[Description Details]

## Category   
	
[Visual, Structural, Functional]  

## Live demo 
	
[code to iframe CodeSandbox]

## Installation or Implementation

[example: npm install --save react-awesome-button]

## Usage 
	
[example: <protvista-tooltip>  </protvista-tooltip> ]

## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|           |      |         |             |


## Exception

__Category: [Error, Warning or Message]__
[Description of the exception (if necessary)]

## License

MIT License

## Author 
	
RegulonDB Team: 
[full developer name]


# Component (technical guide)

## Component Type 

[ Driver, Visual, Application, Custom Hook, ClassComponent ]
// Driver: It is a Component that controls interactions with users, browser, API requests, manage status or processes as well as logic related to data.
// Visual: This component will take care of the structure and styles of our application.
// Application: Application: is the main component of a web application or library.
// Custom Hook: is a custom React function, which unlike the other components can return variables.
// ClassComponent: is a tradicional React component class

## Dependencies
[Dependency name][ Dependency details ]

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name  | Description |  Syntax  | Additional Notes or References | 
| ------ | ----------- | -------- | ------------------------------ |
|        |             |          |                                |

# Functions description

## [function name]

__Description:__  

[Description of the function]


__Usage:__

```javascript
&function(Parameters, if any);
```

__Scope: __

[Scope details]

__Input Parameter:__  
​__[Name]:__ [Description]
__[Name]:__ [Description]


__Return:__  
​__[Type]:__ [Name]
​[Description (if necessary)]

 
**/
import { useGetReleasesVersions } from "../../components/webservices/getDatabaseInfo";
import { useParams } from 'react-router-dom';
import { Menu } from "./menu";
import Release from "./release";

function ReleaseNotes() {
    let { releaseInfo } = useParams();
    // eslint-disable-next-line no-unused-vars
    const { releases, loading, error } = useGetReleasesVersions()
    const query = new URLSearchParams(releaseInfo);
    let version = query.get('version')
    let date = query.get('date')
    console.log(version, date);
    let release;
    if (!version && date && releases) {
        release = releases.find(release => release.releaseDate === date)
        version = undefined
        date = release.releaseDate
    } else {
        if (!releaseInfo && releases) {
            version = releases[0].regulonDBVersion
            date = releases[0].releaseDate
            release = releases[0]
        } else {
            if (version && releases) {
                release = releases.find(release => release.regulonDBVersion === version)
                date = release.releaseDate
            }
        }
    }

    //console.log(release);

    return (
        <div >
            <div>
                {releases && (
                    <Menu releases={releases} version={version} date={date} >
                        {release && (
                            <Release release={release} />
                        )}
                    </Menu>
                )}
            </div>
            <div>
                
            </div>
        </div>
    );
}


export default ReleaseNotes;