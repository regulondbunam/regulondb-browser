---
title: ""
--author: "RegulonDB Team"
--date: '02/07/2020'
output:
  html_document:
    fig_caption: yes
    highlight: zenburn
    includes:
    css: ../../../css/regulondbGlobalStyle.css
    self_contained: yes
---

<center><h1>Gene local context Help</h1></center>
<h2>Image of the gene local context</h2>
The figure Gene Local Context shows the genomic region surrounding the query gene.
The coordinates of this region are displayed at the ends of the figure. The image shows all RegulonDB objects contained within this region; the meaning of all graphic features can be found at:<br>
<a href="./code-colores-for-objects-of-regulondb.html" target="_blank">Graphic code for objects and colors</a> 
<br> <br> Object properties in the image:<br><br>

<b>a)	Orientation.</b> The objects are drawn depending on their strand
                            orientation: on the top of the line, elements in forward, and on the
                            bottom to elements in reverse.
<br><br>
<b>b)	Relationship to the query gene.</b> Objects relating to the query gene are
                            displayed in color or in black, while for that unrelated are displayed in
                            light gray.
<br><br>
<b>c)	Confidence.</b> Objects with strong evidence are plotted with solid lines,
                            whereas those with weak evidence are shown with dashed lines.
<br><br>
<b>d)	Information of the object.</b> All the objects have a tooltip by rolling the
                            mouse over the graphic element, by means of which a brief description is
                            displayed.
<br><br>
<b>e)	Navigation.</b> Clicking on a gene that is displayed in the figure, the user 
                            can navigate to the page describing the selected gene. 
<br>
<h2>Buttons</h2>
Three buttons allow you to zoom in (+), zoom out (-), and expand 5? region (<<>>). 
<br><br>
            The + and - buttons allow you to zoom in and zoom out, respectively by clicking on the button located above the image of the gene 
            local context. 
            <br><br>
            The <<>> button displays 500bp upstream of query gene to 200bp inside of query gene; although, in the case that the 
            query gene is less than 200bp, the graph displays just until its end. The displayed region is amplified; each object position is multiplied 
            by two, doubling the size of each of them. Incomplete objects contained within those 700bp are indicated by a zig-zag line.
            <br><br>
            The >><< button reset to the gene local context image.
            <br><br>
            Furthermore, the help button (?) provides a window designed to present a description of the graphic code for each displayed element in the 
            image, as well as, the color code used.
