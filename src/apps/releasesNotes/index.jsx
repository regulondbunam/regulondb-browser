/**
# Component (user guide)

# ReleaseNotes
	
## Description  
	
The `ReleaseNotes` component is responsible for displaying release notes based on URL parameters and fetched data about release versions. It renders a menu for selecting release versions and a detailed release information component.

## Category   
	
Functional

## Live demo 
--


## Installation or Implementation
--

## Usage 
	
example: <ReleaseNotes/> 

## Props 

| Attribute | Type | Default | Description |
| --------- | ---- | ------- | ----------- |
|           |      |         |             |


## Exception
--

## License

MIT License

## Author 
	
RegulonDB Team: 


# Component (technical guide)

## Component Type 

Visual

## Dependencies
useGetReleasesVersions (Custom Hook): Used to fetch release versions and related data.
useParams (from 'react-router-dom'): Used to access route parameters.
Menu (Custom Component): Used for rendering a menu related to release versions.
Release (Custom Component): Used for displaying detailed information about a specific release.

## States
	
| Property | Value | Description |
| -------- | ----- | ----------- |
|          |       |             |

## Hooks
|  Name   | Description                    |  Syntax    | Additional Notes or References | 
| ------- | ------------------------------ | ---------- | ------------------------------ |
|useParams|Used to access route parameters.|useParams();|                                |

**/
import { useGetReleasesVersions } from "../../components/webservices/getDatabaseInfo";
import { useParams } from 'react-router-dom';
import { Menu } from "./menu";
import Release from "./release";


/**
 * Description placeholder
 *
 * @returns {HTMLElement}
 */
function ReleaseNotes() {
    let { releaseInfo } = useParams();
    // eslint-disable-next-line no-unused-vars
    const { releases, loading, error } = useGetReleasesVersions()


    
    /**
     * Description placeholder
     *
     * @type {URLSearchParams}
     */
    const query = new URLSearchParams(releaseInfo);
    
    /**
     * Description placeholder
     *
     * @type {*}
     */
    let version = query.get('version')
    
    /**
     * Description placeholder
     *
     * @type {*}
     */
    let date = query.get('date')
    // console.log(version, date);
    
    /**
     * Description placeholder
     *
     * @type {*}
     */
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