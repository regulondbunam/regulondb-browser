---
title: ""
--author: "RegulonDB Team"
--date: '02/07/2020'
output:
  html_document:
    fig_caption: yes
    highlight: zenburn
    includes:
    css: ../../css/regulondbGlobalStyle.css
    self_contained: yes
---


<center>
<h1>Frequent Navigation Scenarios</h1>
</center>
<br><br>
<div class="centerDivExplorer">
<div class="centerDiv">
<table class ="table">   
<thead>
<tr>
<th align="left" background="/navigation scenarios-of-regulondb-images/tableHeader.jpeg" class="titleWhite">If I have a gene, how can I get all what is known about its regulation and operon organization of <em>melA</em>?<!--</th>-->
<!--<th valign="middle" width="4%" align="right" background="/images/tableHeader.jpeg">-->
</th>
</tr>
</thead>
</table>
</div>             
</div> 
<div class="centerDivExplorer">
<div class="centerDiv">
<div id="div1000" style="display: block;">                   
<table border="0">
<tr>
<td valign="center">
<div align="center"><img src="./navigation scenarios-of-regulondb-images/example_operon_melA.jpg"/>
</div>
</td>
</tr>
<tr class="backGroundGray" >
<td VALIGN=TOP NOSAVE WIDTH="45%">
<div class="NormalText" STYLE="margin-bottom: 0cm" LANG="es-ES">
<p>&nbsp; </p>
<div align="left">
<font face="Arial, sans-serif">
                                            1. Go to RegulonDB main page, use the search box and write <em>melA</em>. Then, choose the option "gene" and click on go. You can also choose the option &quot;Regulon" to go to "Regulon page".
                                            <br>
                                            <br>
                                            2. The next page will display the graphical context and text information of the gene. You can also find its product, the operon it belongs to and a summary of its regulation. Use the link "Display regulation" to go to "Operon page", or click on Network Tools to see the graphical display of the regulation.			
                                            <br>
                                            <br>
                                            3. On the regulon page, you can see the details of the regulon <em>melA </em>belongs to, the description of the transcription factors, the DNA binding sites they bound, including the details of the promoter, function and central distance to the transcriptional start site. 
                                            <br>
                                            <br>
                                            4. The graphical display of the regulation shows the elements that regulate the gene, as well as the elements that are regulated by the gene itself, including autoregulation. For instance, it is possible to observe that <em>melA</em> is activated by <em>CRP</em> and regulated on a dual form by <em>MelR</em>.
                                            <br>
                                            <br>
                                            5. The Genome Browser shows the localization of <em>melA</em> in the genome.
</font>
</div>
</div>
</td>
</tr>     
</table>
</div>
</div>
</div>
<br><br>
<div class="centerDivExplorer">
<div class="centerDiv">
<table class ="table">   
<thead>
<tr>
<th align="left" background="/regulondb-flow-charts-images/tableHeader.jpeg" class="titleWhite">
If we have a set of genes coming from a ChIP-chip experiment with <em>LexA</em>, how can we discover the transcription factor DNA-binding sites (TFDBSs) common to a regulon obtained from RegulonDB?</th>
<th valign="middle" width="3%" align="right" background="/navigation scenarios-of-regulondb-images/tableHeader.jpeg">
</th>
</tr>
</thead>
</table>
</div>             
</div> 
<div class="centerDivExplorer">
<div class="centerDiv">
<div id="div1001" style="display: block;">                   
<table border="0">                    
<tr>
<td valign="center">
<div align="center">
<img src="./navigation scenarios-of-regulondb-images/diagrama_RSAT_RegulonDB.jpg" width="533" height="911"/>
</div>
</td>
</tr>
<tr  class="backGroundGray">
<td VALIGN=TOP NOSAVE WIDTH="45%">
<div class="NormalText" STYLE="margin-bottom: 0cm" LANG="es-ES">
<div align="justify">
<font face="Arial, sans-serif">
1. Go to RSA Tools main page from RegulonDB - Tools - RSA Tools. This tool is recommended  if there's a lack of sequence information but names of involved genes are known. Using gene names, this tool can retreive genes as well as downstream and upstream sequences. In this page, select the option of &quot;<em>Escherichia coli K12</em>&quot; organism, and specify the gene name &quot;<em>LexA</em>&quot;.
<br>
<br>
2. In the result page, select the "Matrix-scan (matrices)" option, the selected sequences from the specific TF ChIP-chip experiment can be transfered from the previous query or only select the same option in the left menu if you have copied the sequence .		  
<br>
<br>
3. In the matrix text box,   paste the matrix of the gene. To obtain this matrix go to RegulonDB - Download - Data Sets - Matrix_Alignments; search and copy the respective matrix of "<em>LexA</em>".
<br>
<br>4. In the page of Matrix-scan you can see that:
<br> 
4a). Values for some statistic parameters can be set automatically when the model organism is specified.
<br> 
4b). Matrix-scan can return three diferent types of outputs, this makes this tool capable of solving a wide spectrum of biological questions regarding TFBS discovery currently used output type: "Individual matches".
<br> 
4c). Thresholds must be set depending on a specific problem. RSAT tutorials  can provide an intuitive idea of the importance of each value.
<br>
<br>
5. The result page shows the coordinates of found instances of the TFBSs and displays the corresponding map, showing with boxes their position over the scanned sequences.        
</font>
</div>
</div>
</td>
</tr>
</table>
</div>
</div>
</div>
<br><br>   
<div class="centerDivExplorer">
<div class="centerDiv">
<table class ="table">   
<thead>
<tr>
<th align="left" background="/regulondb-flow-charts-images/tableHeader.jpeg" class="titleWhite">How can I have acces to Textpresso from RegulonDB?<!--</th>-->
<th valign="middle" width="3%" align="right" background="/navigation scenarios-of-regulondb-images/tableHeader.jpeg">
</th>
</tr>
</thead>
</table>
</div>             
</div> 
<div class="centerDivExplorer">
<div class="centerDiv">
<div id="div1002" style="display: block;">                   
<table border="0">     
<tr>
<td valign="center">
<div align="center">
<img src="./navigation scenarios-of-regulondb-images/acces_to_textpresso.jpg"/>
</div>
</td>
</tr>
<tr class="backGroundGray" >
<td VALIGN=TOP NOSAVE WIDTH="45%">
<div class="NormalText" STYLE="margin-bottom: 0cm" LANG="es-ES">
<div align="justify">
<font face="Arial, sans-serif">
<p>RegulonDB uses the text-mining tool TextPresso for accessing to specific gene regulation literature and full papers. The RegulonDB literature search can be accessed directly via the link Textpresso in the “Tools” option on the menu of the RegulonDB Home page or as a link on the RegulonDB Literature (book) icon, which is next to the gene name in the gene page. After clicking on this link, the RegulonDB literature search interface is displayed. For formulating a query you will first need to choose the keywords and categories involved with the information you are interested on. </p>
<p>After initiating a search by clicking on the &quot;Search!&quot; button, you will get the results in the Simple Retrieval page with the total of matches to your search. The page will display the number of matches in according with the user search parameters. All publications that contain one or more hits will be shown; the search summary page has diverse output format options. </p>
In this page you will find a view sentences button (vm), which contains a link where you will be able to visualize the current sentences of the publication where matches to the query were identified. The matching sentences are presented with the search parameters highligthed. 
</font>
</div>
</div>
</td>
</tr>
</table>
</div>
</div>
</div>
<br><br>   
<div class="centerDivExplorer">
<div class="centerDiv">
<table class ="table">   
<thead>
<tr>
<th align="left" background="/navigation scenarios-of-regulondb-images/tableHeader.jpeg" class="titleWhite">I have the name of an operon and I want to know everything about it.<!--</th>-->
<th valign="middle" width="3%" align="right" background="/regulondb-flow-charts-images/tableHeader.jpeg">
</th>
</tr>
</thead>
</table>
</div>             
</div> 
<div class="centerDivExplorer">
<div class="centerDiv">
<div id="div1003" style="display: block;">                   
<table border="0">                  
<tr>
<td valign="center">
<div align="center">
<img src="./navigation scenarios-of-regulondb-images/operon_question.jpg"/>
</div>
</td>
</tr>
<tr class="backGroundGray" >
<td VALIGN=TOP NOSAVE WIDTH="45%">
<div class="NormalText" STYLE="margin-bottom: 0cm" LANG="es-ES">
<div align="justify">
<font face="Arial, sans-serif">
<p align="justify"><br>
                                            1. Go to <strong>RegulonDB</strong> main page, use the search box and write the name of the operon i.e. the operon &quot;<em>glnA</em>&quot;. Then, choose the option &quot;Operon&quot; and click on go. <br>
<br>
                                            2. The result page contains everything about the operon <em>glnA</em>.</p>
<p><br>
                                            3. Graphic display of  genes, promoters and regulation sites of the operon. <br>
                                           <br> 4.<strong> Transcription Unit</strong> displays gene names, promoter, regulatory interaction and DNA binding sites. <br>
                                            &nbsp;&nbsp;&nbsp;&nbsp; 4a) Shows the <strong>promoter</strong> sequence that allows us to observe the -10 and -35 boxes and transcription start sites.<br>
                                           &nbsp;&nbsp;&nbsp;&nbsp; 4b) <strong>Terminator</strong> indicates the sequence where transcription ends. <br>
                                           &nbsp;&nbsp;&nbsp;&nbsp; 4c) <strong>Regulation</strong> type shows the transcription factor, function, promoter, binding sites, evidence and references. <br>
                                           &nbsp;&nbsp;&nbsp;&nbsp; 4d) <strong>References</strong> and <strong>evidence</strong> that support the operon information. <br>
<br>
                                            The information described in 4 is the structure  for every transcription unit  contained in the operon. </p>
</font>
</div>
</div>
</td>
</tr>
</table>
</div>             
</div> 
</div>
<br><br> 
<br> 