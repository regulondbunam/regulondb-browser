import { useEffect, useState } from "react"
import { HeaderNav } from "../cover/headerNav"
import { AnchorBox } from "./anchor";
import { useSpring, animated } from '@react-spring/web'
import Card, { showCard } from "../card";
import Style from "./anchorNav.module.css"
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Tooltip from "@mui/material/Tooltip";
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import VerticalAlignBottomIcon from '@mui/icons-material/VerticalAlignBottom';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';

function scrollFunction(sections = [], setIdSection, setOnTop, title = "", setNavTitle, animateAnchor) {
  setOnTop(document.documentElement.scrollTop < 260)
  const headerNav = document.getElementById("headerNav")
  const headerNavAnchor = document.getElementById("headerNavAnchor")
  const anchorMenu = document.getElementById("anchorMenu")
  if (
    document.body.scrollTop > 260 ||
    document.documentElement.scrollTop > 260
  ) {

    if (headerNav) {
      headerNav.className = Style.headerNavShow
      headerNav.style.display = "flex"
      sections.forEach((section) => {
        const initSection = document.getElementById("init_section_" + section.id)
        const endSection = document.getElementById("end_section_" + section.id)
        if (initSection && endSection) {
          const initY = initSection.getBoundingClientRect().y
          const endY = endSection.getBoundingClientRect().y
          const hNav = headerNav.getBoundingClientRect().height
          if (initY <= hNav && endY >= hNav) {
            setNavTitle(`${title}, ${section.title}`)
            console.log(section.id);
            setIdSection(section.id)
            animateAnchor(section.id)
          }
        }
      })
    }
    if (headerNavAnchor) {
      headerNavAnchor.className = Style.headerSticky
    }
    if (anchorMenu) {
      anchorMenu.className = Style.menuSticky
    }



  } else {
    if (headerNav) {
      headerNav.style.display = "none"
    }
  }

}

export default function AnchorNav({ title = "", sections = [], idSelectSection, header, aside, bottom }) {

  const [idSection, setIdSection] = useState(idSelectSection);
  const [navTitle, setNavTitle] = useState(title);
  const [viewMenu, setViewMenu] = useState(true);
  const [collapse, setCollapse] = useState(false);
  const [onTop, setOnTop] = useState(document.documentElement.scrollTop > 260);
  const [springs, api] = useSpring(() => ({
    from: { y: 0 },
  }))
  //console.log(onTop);
  useEffect(() => {
    const animateAnchor = (id) => {
      const optionOld = document.getElementById(idSection)
      const optionNew = document.getElementById(id)
      const box = document.getElementById('anchors_box')
      if (optionNew && box) {
          const yBox = box.getBoundingClientRect().y
          let yFrom = 0
          if (optionOld) {
              yFrom = Math.abs(yBox-optionOld.getBoundingClientRect().y-(optionOld.getBoundingClientRect().height/2)+2)
          }
          let yTo = Math.abs(yBox-optionNew.getBoundingClientRect().y-(optionNew.getBoundingClientRect().height/2)+2)
          console.log(yBox, yFrom, yTo);
          
          api.start({
              from: {
                y: yFrom,
              },
              to: {
                y: yTo,
              },
            })
      }
    }

    if (!collapse) {
      window.onscroll = function () {
        scrollFunction(sections, setIdSection, setOnTop, title, setNavTitle, animateAnchor);
      };
    }

    const anchorSections = document.getElementById("anchorSections")
    if (anchorSections) {
      if (collapse) {
        if (idSection) {
          sections.forEach(section => {
            if (section.id === idSection) {
              showCard(section.id, true)
            } else {
              showCard(section.id, false)
            }

          });
        }
      }
    }
    return function cleanup() {
      window.onscroll = function () { };
    };
  }, [collapse, idSection, sections, title, api]);

  

  const handleCollapse = () => {
    sections.forEach(section => {
      showCard(section.id, collapse)
    });
    if (collapse) {
      window.onscroll = function () { };
    }
    setCollapse(!collapse)
  }

  const handleTop = () => {
    if (onTop) {
      let lastSection = sections[sections.length - 1]
      if (lastSection) {
        lastSection = document.getElementById("card_" + lastSection.id)
        if (lastSection) {
          window.scroll({
            top: lastSection.offsetTop,
            behavior: 'smooth'
          });
        }
      }
    } else {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      });
    }
    setOnTop(!onTop)

  }

  const handleMenu = () => {
    const anchorBody = document.getElementById("anchorBody")
    const anchorContent = document.getElementById("anchorContent")
    if (anchorBody && anchorContent) {
      if (viewMenu) {
        anchorBody.className = Style.bodyMenuHide
        anchorContent.style.marginLeft = "40px"
      } else {
        anchorBody.className = Style.body
        anchorContent.style.marginLeft = "1%"
      }
    }

    setViewMenu(!viewMenu)
  }

  const handleChange = (id) => {
    const sectionCard = document.getElementById("scroll_section_" + id)
    if (sectionCard) {
      sectionCard.scrollIntoView({behavior: 'smooth'})// behavior: 'smooth'
    }
  };

  return (
    <div>
      <div id={"headerNavAnchor"} className={Style.cover}>
        <HeaderNav title={navTitle} />
      </div>
      <div className={Style.header}>
        {header}
      </div>
      <div id="anchorBody" className={Style.body}>
        <div >
          {viewMenu ? (
            <div id="anchorMenu" className={Style.menu}>
              <ButtonGroup
                disableElevation
                aria-label="Disabled elevation buttons"
              >
                <Tooltip title={"Hide Menu"} >
                  <IconButton onClick={handleMenu} sx={{ borderRadius: 0 }} color="secondary" >
                    <FormatIndentDecreaseIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={onTop ? "go to top page" : "go to bottom page"} >
                  <IconButton onClick={handleTop} sx={{ borderRadius: 0 }} color="secondary" >
                    {onTop ? <VerticalAlignBottomIcon /> : <VerticalAlignTopIcon />}
                  </IconButton>
                </Tooltip>
                <Tooltip onClick={handleCollapse} title={collapse ? "Expand all sections" : "Collapse all sections"} >
                  <IconButton sx={{ borderRadius: 0 }} color="secondary" >
                    {collapse ? <UnfoldMoreIcon /> : <UnfoldLessIcon />}
                  </IconButton>
                </Tooltip>
              </ButtonGroup>
              <AnchorBox anchors={sections}
                idSelect={idSection}
                onChange={handleChange}
                animate={
                  <div>
                  {idSection && (
                      <animated.div
                          id="anchor_list_style"
                          style={{
                              marginLeft: "2px",
                              position: "absolute",
                              height: "8px",
                              width: "8px",
                              borderRadius: "50%",
                              backgroundColor: "#3D779B",
                              ...springs,
                          }}
                      />
                  )}
  
              </div>
                }
              />
            </div>
          )
            : (
              <div id="anchorMenu" className={Style.menuHide}>
                <Tooltip title={"Show Menu"} >
                  <IconButton onClick={handleMenu} sx={{ borderRadius: 0 }} color="secondary" >
                    <FormatIndentIncreaseIcon />
                  </IconButton>
                </Tooltip>
              </div>
            )}
        </div>
        <div id="anchorContent" className={Style.content}>
          <div id="anchorSections" className={Style.section}>
            {sections.map((section, index) => {
              return <div key={"c_" + index + "_section_" + section.id} >
                <div className={Style.scroll_section} id={"scroll_section_" + section.id} />
                <div className={Style.flag_section} id={"init_section_" + section.id}/>
                  <Card id={section.id} title={section.title} >
                    {section.component}
                <div className={Style.end_flag_section} id={"end_section_" + section.id}/>
                  </Card>
                <br />
              </div>
            })}
          </div>
          <div className={Style.bottom}>
            {bottom}
          </div>
        </div>
        <div className={Style.aside}>
          {aside}
        </div>
      </div>
    </div>
  )
}