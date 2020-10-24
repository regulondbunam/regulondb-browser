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
<p><h1>NLP for facilitating and accelerating curation in RegulonDB</h1></p>
</center><br>
<p align="justify">
To facilitate and accelerate our biocuration work, we started research in Natural Language Processing (NLP), an active field developing approaches to detect, extract and organize knowledge from biomedical literature. We initiated in 2014 with an approach to curate the experimental contrasting variable in growth conditions using the OntoGene text mining system. We called this an assisted or semiautomatic curation since it involves the final manual curation given a set of selected sentences by the system. By “growth condition” we mean here exclusively the contrast or variable that differs between the control and the experimental condition [(Gama-Castro S et al. 2014)](https://pubmed.ncbi.nlm.nih.gov/24903516/). <br> Lately, we collected a data set of manually validated sentences  containing knowledge of regulatory interactions between transcription factors (TFs) and genes, which include growth  conditions, for training classification models using machine learning techniques. The idea is to facilitate curation by using predictive models to process article collections to filter and prioritize relevant sentences. <br> In addition, we have worked on the extraction of information about biological processes of regulated genes and structural domains of the TFs to support elaboration of our TF extensive summaries. We used manual summaries to train an automatic summarizer that collects sentences concerning these TF properties from article collections [(Méndez-Cruz CF et al. 2017)](http://www.ncbi.nlm.nih.gov/pubmed/29220462).  Below, we show the manual and automatic summary of ArgR. An implementation of this summarizer is available in [github](https://github.com/bionlp-cgp/automatic-summarization-TFs).
</p>
<br>
<center>
<p>
        <table width="60%" cellpadding="10" >
            <tr>
                <td width="50%" valign="middle" height="30" style="border-top:2px ridge #006699;border-bottom:2px ridge #006699;border-left:2px ridge #006699;">
                  <p align="center">Manual summary</p>
                </td>
                <td colspan="1" valign="middle" style="border-top:2px ridge #006699;border-bottom:2px ridge #006699;border-right:2px ridge #006699;">
                  <p align="center">  Automatic summary </p>
                </td>
            </tr>
            <tr>
                <td valign="top" height="30" style="border-top:2px ridge #006699;border-bottom:2px ridge #006699; text-align: justify; line-height:15pt;">
                    ArgR has two domains: The N-terminal domain, which contains a winged-helix-turn-helix DNA-binding 
                    motif and the C-terminal domain, which contains a motif that binds L-arginine and a motif for 
                    oligomerization. Based on cross-linking analysis of wild-type and mutant ArgR proteins, it has 
                    been shown that the C-terminus is more important in cer/Xer site-specific recombination than in DNA-binding.<br>
                    ArgR complexed with L-arginine represses the transcription of several genes involved in 
                    biosynthesis and transport of arginine, transport of histidine, and its own synthesis and activates 
                    genes for arginine-catabolism. ArgR is also essential for a site-specific recombination reaction that 
                    resolves plasmid ColE1 multimers to monomers and is necessary for plasmid stability.
                </td>
                <td colspan="1" valign="top" style="border-top:2px ridge #006699;border-bottom:2px ridge #006699; text-align: justify; line-height:15pt;">
                    Results The domain structure of ArgR. The mutagenesis results of two laboratories have shown that the ArgR 
                    subunit is made up of two functional regions: a basic N-terminal half responsible for DNA-binding and 
                    an acidic C-terminal half responsible for both oligomerization and for 
                    binding arginine (Burke et al., 1994; Tian & Maas, 1994).<br>
                    We overexpressed the C-terminal domain of ArgR (ArgRc) corresponding to amino acids 80 to 156 in a T 7 
                    polymerase-driven system and purified the protein to homogeneity .<br>
                    Discussion The C-terminal domain of ArgR forms a hexameric protein core that contains the binding sites 
                    for L-arginine and provides a central, symmetric scaffold for six DNA-binding domains.<br>
                    In addition to regulating the transcription of arginine biosynthetic genes, ArgR plays 
                    an obligatory role in a site-specific recombination reaction that resolves ColE1-like 
                    plasmid multimers to monomers and is necessary for plasmid stability (Stirling et al. , 1988) .
                    <br><br>
                </td>
            </tr>
	</table> 
</p>
</center>
<br>
<p align="justify">
We conceive the knowledge in RegulonDB as the training set to generate and evaluate NLP approaches and tools that we expect will be used both to the benefit of E. coli and potentially of other microbial organisms. </p>       
<br>

## NLP resources
<p align="justify">
<br>
 a) Regulatory Interactions. As a product of the work described above, two NLP resources have been created that we make them available for the BioNLP community, especially for tasks of automatic classification, passage detection, and relation extraction. The first is a data set of validated sentences divided in two classes. These sentences were obtained from [142 articles](http://regulondb.ccg.unam.mx/menu/tools/nlp/files/pmids.txt) concerning transcriptional regulation.</p>

<br>

<center>
        <table width="60%" cellpadding="10" >
<tr>
                <td width="46%" valign="middle" height="16" style="border-top:2px ridge #006699;border-bottom:2px ridge #006699; ridge #006699;">
                    Description
                </td>
                <td width="18%" valign="middle" style="border-top:2px ridge #006699;border-bottom:2px ridge #006699; ridge #006699;">
                    Class
                </td>
                <td width="18%" valign="middle" style="border-top:2px ridge #006699;border-bottom:2px ridge #006699;">
                    Total instances
                </td>
                <td width="18%" colspan="1" valign="middle" style="border-top:2px ridge #006699;border-bottom:2px ridge #006699; ridge #006699;">
                    File
                </td>
            </tr>
            <tr>
                <td valign="top" height="30" style="border-top:2px ridge #006699; text-align: justify; line-height:15pt;">
                    Regulatory interactions without growth condition
                </td>
                <td colspan="1" valign="top" style="border-top:2px ridge #006699; text-align: justify; line-height:15pt;">
                    RI
                </td>
                <td colspan="1" valign="top" style="border-top:2px ridge #006699; text-align: justify; line-height:15pt;">
                    896
                </td>
                <td colspan="1" valign="top" style="border-top:2px ridge #006699; text-align: justify; line-height:15pt;">
                    <a target="_blank" href="/menu/tools/nlp/files/sentences_RI.txt">Download</a>
                </td>
            </tr>
            <tr>
                <td valign="top" height="30" style="border-bottom:2px ridge #006699; text-align: justify; line-height:15pt;">
                    Regulatory interactions with growth condition
                </td>
                <td colspan="1" valign="top" style="border-bottom:2px ridge #006699; text-align: justify; line-height:15pt;">
                    RI+GC
                </td>
                <td colspan="1" valign="top" style="border-bottom:2px ridge #006699; text-align: justify; line-height:15pt;">
                    253
                </td>
                <td colspan="1" valign="top" style="border-bottom:2px ridge #006699; text-align: justify; line-height:15pt;">
                    <a target="_blank" href="/menu/tools/nlp/files/sentences_RIGC.txt">Download</a>
                </td>
            </tr>
        </table> 
        </center>
<p align="justify">
<br>
b) TFs summaries. The second resource is a data set of manual summaries for 178 TFs in text format. These could be used as samples of high-quality curated knowledge comprising several properties of TFs for developing user-oriented multi-document summarizers in automatic text summarization research. 
</p>
<br>


<center>
        <table width="60%" cellpadding="10" >
            <tr>
                <td width="46%" valign="middle" height="16" style="border-top:2px ridge #006699;border-bottom:2px ridge #006699; ridge #006699;">
                    Description
                </td>
                <td width="27%" valign="middle" style="border-top:2px ridge #006699;border-bottom:2px ridge #006699; ridge #006699;">
                    Total instances
                </td>
                <td width="27%" colspan="1" valign="middle" style="border-top:2px ridge #006699;border-bottom:2px ridge #006699;">
                    File
                </td>
            </tr>
            <tr>
                <td valign="top" height="30" style="border-bottom:2px ridge #006699; text-align: justify; line-height:15pt;">
                    Manual summaries of 178 TFs in text format
                </td>
                <td colspan="1" valign="top" style="border-bottom:2px ridge #006699; text-align: justify; line-height:15pt;">
                    178
                </td>
                <td colspan="1" valign="top" style="border-bottom:2px ridge #006699; text-align: justify; line-height:15pt;">
                    <a href="/menu/tools/nlp/files/TF-manual-summaries-text-vRegulonDB10.5.zip">Download</a>
                </td>
            </tr>
	</table> 
</center>

