# RegulonDB Releases

###Release 10.7

April 05th, 2020

 The HicB protein, known as the antitoxin of the HicA-HicB toxin-antitoxin system, was recently described as a transcription factor. It regulates the transcription of the operon that encodes the toxin-antitoxin system to which it pertains [Kathryn J Turnbull and Kenn Gerdes  (2017)](http://www.ncbi.nlm.nih.gov/pubmed/28266056).

The new complex CRP-Sxy, which regulates some genes related to DNA uptake (natural competence), was added to the database. The CRP-Sxy complex recognizes  a DNA-binding site that has an asymmetric organization: it has two distinct half-sites, one of which is similar to the canonical CRP DNA-binding site, whereas the other half-site is less conserved [Emilie Søndberg et al. (2019)](http://www.ncbi.nlm.nih.gov/pubmed/31543875).                

H-NS changes DNA rigidity and forms bridges between DNA molecules in the presence of Mg2+ [Yan Liang et al. (2017)](http://www.ncbi.nlm.nih.gov/pubmed/29127381).  There are two DNA-bending steps during site recognition by IHF. The fast-phase step entails nonspecific DNA bending, while the slow phase involves specific DNA kinking during site recognition [Yogambigai Velmurugu et al. (2018)](http://www.ncbi.nlm.nih.gov/pubmed/29267885). A novel regulatory role of RpoS in protecting cells against heat stress was suggested [Christopher R Evans et al. (2019)](http://www.ncbi.nlm.nih.gov/pubmed/31419308). OxyR also senses sulfane sulfur (H2Sn) under both aerobic and anaerobic conditions [Ningke Hou et al. (2019)](http://www.ncbi.nlm.nih.gov/pubmed/31421411).

Notes or summaries for 117 objects were updated, of which 11 are associated with Transcription Factors.

### Release 10.6

 July 26th, 2019. This release corresponds to Release 23.0 of EcoCyc.

IRs (inverted repeats) and amino acid residues were identified as important for DgoR to bind its cis-acting element [Singh B et al. (2019)](http://www.ncbi.nlm.nih.gov/pubmed/30455279). D-galactonate induced a conformational change in DgoR to derepress                 the *dgoRKADT* operon [Singh B S et al. (2019)](http://www.ncbi.nlm.nih.gov/pubmed/30455279), and glutarate selectively relieved repression of the *glaH-lhgO-gabDTP* operon by GlaR [Knorr S et al. (2018)](http://www.ncbi.nlm.nih.gov/pubmed/30498244).         

DksA was found to be critical for aerobic nitric oxide (NO) detoxification [Chou WK et al. (2019)](http://www.ncbi.nlm.nih.gov/pubmed/30366060), and OmpR was identified as a regulator of bacterial virulence, growth, and metabolism, in addition to its role in regulating outer membrane proteins [Chakraborty S et al. (2018)](http://www.ncbi.nlm.nih.gov/pubmed/30524381).                

Finally, 129 regulatory interactions from high-throughput analysis for the Nac transcriptional dual regulator were added to the Nac regulon [Aquino P et al. (2017)](http://www.ncbi.nlm.nih.gov/pubmed/28061857).                

**Summaries for 48 objects were updated. We have curated the published literature through the end of December 2018.** 



### Release 10.5

 Jun 18th, 2018. This release corresponds to Release 22.0 of EcoCyc.

**Classical Annotation.**

Two new transcriptional regulators were identified: YhaJ, a newly identified transcriptional regulator controlling genes involved in different processes, and XynR, a regulator of xylonate catabolism in Escherichia coli K-12 W3110. These two identifications were based on analysis using a SELEX screening system. X-ray structures were determined for FrmR, a formaldehyde sensor, at 2.7 Å resolution, and for RcdA at 2.55 Å resolution, and the amino acids in the CadC DNA-binding domain (DBD) for DNA recognition and function were identified as was the crystal structure of the CadC DBD. The YedVW  was renamed HprSR. The OmpR and CutR regulon were determined based on ChIP-exo and transcript profiling, respectively. Alteration of the Gly184 residue of the CRP affects its DNA binding and probably its RNA polymerase interaction, and acetylation of the lysine (K100) residue is a mechanism by which the cell downregulates CRP-dependent class II promoter activity while elevating CRP steady-state levels, thus indirectly increasing class I promoter activity. 

Summaries for more than 180 objects were updated.                

The molecular biology and physiological-level descriptions were included for GENSOR Units. Also, the signal names for the two-component system GENSOR Units were annotated.



**High-throughput experiment annotations.** The RegulonDB database contains the rich legacy of decades of classic molecular biology experiments supporting what we know about gene regulation and operon organization in E. coli K-12. We now include high-throughput data set collections from 32 ChIP techniques and 19 gSELEX publications, respectively. There are three essential features for the integration of this information coming from different methodological approaches: first, a controlled vocabulary within an ontology for precisely defining growth conditions; second, the criteria to integrate separate elements with enough evidence to consider them involved in gene regulation and part of our golden standard elements; third, an expanded computational model supporting this knowledge. Altogether, this constitutes the basis for adequately gathering and enabling the comparisons and integration strongly needed to manage and access such a wealth of knowledge and to allow advances into the postgenomic era.

These curated HT-supported regulatory interactions are now present within RegulonDB and can be found on the regulon page of the corresponding TF. The most direct way to access them is to type the TF name followed by "regulon," go to the link of the regulon, and display the TF regulon page.                

Furthermore, via the ?Downloads? main page menu, HT datasets and any of the TF-specific HT binding datasets can be selected. For more details of this work see (Santos-Zavaleta et al., submitted).

**Microbial Condition Ontology(MCO).** We curated terms related to  experimental conditions that affect gene expression in Escherichia coli K-12. Since this is the  best-studied microorganism, the collected terms are the seed for the MCO, a controlled and structured vocabulary that can be expanded to annotate microbial conditions in general. Moreover, we developed an annotation framework  to describe experimental conditions. Furthermore, we will disseminate MCO throughout the Open Biological and  Biomedical Ontology (OBO) Foundry in order to set a standard for the annotation of gene expression data.                 

The ontology can be accessed in the Integrated Views & Tools menu. Alternatively, the user can do a search using the search text box for a very specific term. In this case, the number of terms matching the query term can be seen in the summary section, in the "Growth Conditions" link. For further details see (Tierrafría et al., submitted).

__Additional features.__ 

The Web services to get different views of the genetic  network was updated to include REST (JSON) architectural style.



### Release 9.4

 May 8th, 2017. This release corresponds to Release 20.5 of EcoCyc.

Several promoters and transcription factors were identified that control *rpoE-rseABC* operon expression under different growth conditions [Klein G et al. (2016)](http://www.ncbi.nlm.nih.gov/pubmed/27629414). PdeL is a bifunctional protein, since it was identified as a transcriptional regulator due its capability to bind to its own promoter region and stimulate its expression  in response to c-di-GMP, in addition to its enzymatic activity as a phosphodiesterase [Reinders A et al. (2015)](http://www.ncbi.nlm.nih.gov/pubmed/26553851). The HigBA toxin-antitoxin (TA) complex and HigA antitoxin were also identified as transcriptional repressors of their own expression. The crystal structure of the TA HigBA complex was solved and displays a hetero-tetramer, (HigBA)2, comprised of two HigB and two HigA subunits [Yang J et al. (2016)](http://www.ncbi.nlm.nih.gov/pubmed/27601326).             

The summaries for HigAB, HigA, GlrR and PdeL transcriptional regulators were updated.             

We have curated the published literature through the end of September 2016.            



### Release 9.3

 February 14th, 2016. This release corresponds to Release 20.1 of EcoCyc.

The affinities and interaction types for two transcription factors in two different promoters were                 described. The *yhjX* promoter has two YpdB-binding sites, and the site with higher affinity is important for stability and for binding of a second YpdB molecule to the lower-affinity site; together they enhance protein-DNA interactions [Behr S et al. (2016)](http://www.ncbi.nlm.nih.gov/pubmed/27013338). On the other hand, the *copA*  promoter can interact with RNA polymerase independently of the holo- or apo-conformation of CueR, due to two types of interactions between RNA polymerase and the *copA* promoter: one is favored by the holo-CueR conformation to activate transcription, and the other one is favored by apo-CueR to repress transcription [Martell DJ et al. (2015)](http://www.ncbi.nlm.nih.gov/pubmed/26483469).            

CecR (**Ce**foperazone and **c**hloramphenicol **R**egulator of sensitivity), which belongs to the TetR family, was identified as a new transcriptional regulator involved in the control of sensitivity to cefoperazone and chloramphenicol [Yamanaka Y et al. (2016)](http://www.ncbi.nlm.nih.gov/pubmed/27112147). DecR was also identified as a new transcriptional regulator involved in cysteine detoxification [Shimada T et al. (2016)](http://www.ncbi.nlm.nih.gov/pubmed/27435271).            

The summaries for PhoB, RcsB, LacI, AraC, NarL, RpoH, CRP, MqsR, RcsA, CpxR, MarA, YpdB, CueR,                 MarRAB, RstA, BasR (PmrA), TyrR, ExuR, UxuR, CspA, NrdR, and DecR (YbaO) transcriptional                 regulators were updated.

We have curated the published literature through the end of June 2016.            



### Release 9.2

 September 9th, 2016. This release corresponds to Release 20.0 of EcoCyc.

New structural properties of two TFs were identified: the NarL receptor domain is able to stimulate gene             transcription in a nitrate-responsive manner [Katsir G et al. (2015)](http://www.ncbi.nlm.nih.gov/pubmed/25568260) and CRP whose Thr127 and Ser128 residues provide high cAMP affinity and play a key role in stabilization of the CRP inactive form [Gunasekara SM et al. (2015)](http://www.ncbi.nlm.nih.gov/pubmed/26378231). On the other hand, the response regulators KdpE and RcsB are capable of driving gene expression [Narayanan A et al. (2014)](http://www.ncbi.nlm.nih.gov/pubmed/24526190) and form complexes with other proteins in a unphosphorylated manner [Pannen D et al. (2016)](http://www.ncbi.nlm.nih.gov/pubmed/26635367). Also, under anaerobic and iron-dependent conditions, Fur binds to more sites across the genome, increasing the number of target genes [Beauchene NA et al. (2015)](http://www.ncbi.nlm.nih.gov/pubmed/26670385).            

The notes for *rrsE*, *rrsH*, *rrsD*, and *rrsB* rRNAs [Maeda M et al. (2015)](http://www.ncbi.nlm.nih.gov/pubmed/26717514), ExuR [Tutukina MN et al. (2016)](http://www.ncbi.nlm.nih.gov/pubmed/26549308), UxuR [Tutukina MN et al. (2016)](http://www.ncbi.nlm.nih.gov/pubmed/26549308), BaeR [Yao Y et al. (2015)](http://www.ncbi.nlm.nih.gov/pubmed/26681035), GlpR [Vimala A et al. (2016)](http://www.ncbi.nlm.nih.gov/pubmed/26691989), RpoS [Guo M et al. (2015)](http://www.ncbi.nlm.nih.gov/pubmed/26260461), CsrB [Zere TR et al. (2015)](http://www.ncbi.nlm.nih.gov/pubmed/26673755), CspA, CsgD [Soo VW et al. (2013)](http://www.ncbi.nlm.nih.gov/pubmed/24212724), Dps [Lee SY et al. (2015)](http://www.ncbi.nlm.nih.gov/pubmed/26657062), IHF [Lee SY et al. (2015)](http://www.ncbi.nlm.nih.gov/pubmed/26657062), CueR [Szunyogh D et al. (2015)](http://www.ncbi.nlm.nih.gov/pubmed/26563985), Mlc [Bréchemier-Baey D et al. (2015)](http://www.ncbi.nlm.nih.gov/pubmed/26293172), UvrY [Zere TR et al. (2015)](http://www.ncbi.nlm.nih.gov/pubmed/26673755), and NarL [Katsir G et al. (2015)](http://www.ncbi.nlm.nih.gov/pubmed/26307095) transcriptional regulators, and CsrB small regulatory RNA [Zere TR et al. (2015)](http://www.ncbi.nlm.nih.gov/pubmed/26673755) were updated.

We have now curated the published literature through the end of December 2015.            



### Release 9.1

 April 7th, 2016. This release  corresponds to Release 19.1 and 19.5 of EcoCyc. All data on  transcriptional regulation curated in our lab is the same in both  databases.



NimR (formally YeaM) confers resistance to 2-nitroimidazole, an antibacterial and antifugal agent                 and plays a regulatory role in divergent transcription of the *nimT* and *nimR* genes [Ogasawara H et al. (2014)](http://www.ncbi.nlm.nih.gov/pubmed/25790494). Based on Genomic SELEX screening, the two-component system (TCS) YedVW was characterized [Urano H et al. (2015)](http://www.ncbi.nlm.nih.gov/pubmed/25568260). The YedVW and CusSR TCSs form a unique regulation system, where both TCSs recognize the same DNA sequence for binding in the *hiuH*; YedVW sensing H2O2 and CusSR sensing Cu(II) [Urano H et al. (2015)](http://www.ncbi.nlm.nih.gov/pubmed/25568260). YdeO regulon plays an important role in survival under, both acidic and anaerobic conditions [Durban J et al. (2013)](http://www.ncbi.nlm.nih.gov/pubmed/23575160).            

Two transcriptional regulators were identified. YjjQ, a transcriptional repressor of genes required                 for flagellar synthesis, capsule formation, and other genes related to virulence [Wiebe H et al. (2015)](http://www.ncbi.nlm.nih.gov/pubmed/26078445), as                 well as  YebK, a transcriptional regulator implicated in the adaptation to the transition from rich medium to cellobiose minimal medium, reducing the length of the lag phase [Parisutham V et al. (2015)](http://www.ncbi.nlm.nih.gov/pubmed/26121029). On the other hand, it also was determined that both YbiB and Dam bind to DNA and could play a role in the transcriptional regulation [Schneider D et al. (2015)](http://www.ncbi.nlm.nih.gov/pubmed/26063803), [Horton JR et al. (2015)](http://www.ncbi.nlm.nih.gov/pubmed/25845600).            

Summaries for MazE, McbR, CRP, RutR, BolA, FadR, Zur, H-NS, OmpR, H-NS, CRP, LacI, FadR, NemR, DksA,                 SdiA, PhoB, HU, CadC, and SoxR transcriptional regulators were updated.

We have curated the published literature through the end of July 2015.      



###Release 9.0

 September 15, 2015. This versión of RegulonDB(9.0) uses the same release data from Ecocyc (19.0) as the previous versión (8.8).



**Updated TF families, position-weight matrices and their grouping in clusters**

We have updated the computationally predicted transcription factors, which total 304 (184 with experimental evidence and 120 from computational predictions); we updated our position-weight matrices and have included tools for clustering them in evolutionary families.             

**Comprehensive semiautomatic curated elementary Gensor Units**

We redesigned theWeb page for GENSOR units, and this page now contains three sections: the graphical map of the elementary GENSOR unit, its general properties, including the written summary and a section for the properties of each reaction.            

**Coexpression distance around the Regulatory Network**

We have implemented tools for a full comparison of expression of groups of genes across all conditions. The 'Coexpression' page can be reached directly from the search option. A single query gene or a group of genes are added either manually, based on the set of interest to the user, or are automatically uploaded as a collection of genes defining operons or regulons. In addition, we offer a coexpression overview for two groups of input genes: operons and regulons.



###Release 8.8

 May 5th, 2015. This release  corresponds to Release 19.0 of EcoCyc. All data on transcriptional  regulation curated in our lab is the same in both databases.

SutR (formally YdcN) was identified as a transcriptional dual regulator of genes involved in the             utilization of sulfur metabolism [ Yamamoto K et al. (2014)](http://www.ncbi.nlm.nih.gov/pubmed/25406449).        

 The crystal structure of the DinJ-YafQ complex was resolved at 1.8 Å [Ruangprasert A et al. (2014)](http://www.ncbi.nlm.nih.gov/pubmed/24898247).             Notes for BaeR, AcrR, Fur, SoxS, PspF, and CpxR were updated             [Srivastava SK et al. (2014),](http://www.ncbi.nlm.nih.gov/pubmed/24999585)             [Lee JO et al. (2014),](http://www.ncbi.nlm.nih.gov/pubmed/25176444)             [Méhi O et al. (2014),](http://www.ncbi.nlm.nih.gov/pubmed/25063442)             [Molina-Quiroz RC et al. (2014),](http://www.ncbi.nlm.nih.gov/pubmed/25049169)             [Darbari VC et al. (2014),](http://www.ncbi.nlm.nih.gov/pubmed/25063294)             [Vogt SL et al. (2014)](http://www.ncbi.nlm.nih.gov/pubmed/25246476).                

**Searching** 

A new view was added to the display of search results by regulon. When the user selects "regulon search" without giving a term, all the regulons are displayed. The table shows the regulon name, the total of regulated genes, the total of regulated operons, the total of binding sites, and the total of regulatory interactions.            

**Downloads**

A link to download the weight matrices in consensus format was added to the downloads page of the website.



###Release 8.7

  February 2nd, 2015. This  release corresponds to Release 18.1 and 18.5 of EcoCyc. All data on  transcriptional regulation curated in our lab is the same in both  databases.



MraZ was identified as a transcriptional repressor involved in the control of cell division and cell wall genes [Eraso JM et al. (2014)](http://www.ncbi.nlm.nih.gov/pubmed/24659771). It binds to a region of DNA containing three successive TGGGN direct repeats that are separated by two consecutive 5-nt-spacer close to *mraZ*p promoter [Eraso JM et al. (2014)](http://www.ncbi.nlm.nih.gov/pubmed/24659771). Also, the summaries for MraZ, CRP, RcsB- BglJ, HipB, LacI, PhoB, YehT, YpdB, HypT, MarR transcriptional             regulators were updated.

On the other hand, YdcI was also identified as a transcriptional repressor involved in the survival,             stress response, and cell interactions in  *Salmonella enterica* serovar Typhimurium [Solomon L et al. (2014)](http://www.ncbi.nlm.nih.gov/pubmed/24962596).             Based on N- and C-terminal exchange between *S.* Typhimurium and *Escherichia coli*, it was also             possible to determine that YdcI is a transcriptional repressor in *E. coli* [Solomon L et al. (2014)](http://www.ncbi.nlm.nih.gov/pubmed/24962596).         

The crystal structure of LsrR, with its native signal (phosphor-Al-2), SdiA, and DhaR, has been determined [ Ha JH et al. (2013),](http://www.ncbi.nlm.nih.gov/pubmed/24047255) [ Kim T et al. (2014),](http://www.ncbi.nlm.nih.gov/pubmed/24598739) [ Shi R et al. (2014)](http://www.ncbi.nlm.nih.gov/pubmed/24440518). Summaries for OmpR, H-NS, CRP, IHF, PhoB, transcriptional regulators, and the specialized sigma in response in heat shock and misfolded proteins, σE;  were updated.         

We have curated the published literature through the end of September 2014.        

###Release 8.6

 April 11th, 2014. This release corresponds to Release 18.0  of EcoCyc. All data on transcriptional  regulation curated in our lab is the same in both databases.

RclR (formerly YkgD) has been experimentally determined to be a redox-sensitive transcriptional activator of essential genes for survival under reactive chlorine stress [Parker BW et al. (2013)](http://www.ncbi.nlm.nih.gov/pubmed/24078635). In addition, ArcA was shown to utilize its diverse binding site architecture for global control of carbon oxidation pathways [Park DM et al. (2013)](http://www.ncbi.nlm.nih.gov/pubmed/24146625). Also, the summaries for MlrA, ArcA, FeaR, MalT, OmpR, CspA, BaeR, Crp, AraC, H-NS, and FadR transcriptional regulators were updated.         

In addition, we have added data from high-throughput experiments to RegulonDB as a dataset, with data for LeuO, H-NS, and CRP transcriptional regulators from genomic SELEX analysis and for transcriptional start site mapping based on dRNA-seq, [see High-throughput Datasets](http://regulondb.ccg.unam.mx/menu/download/high_throughput_datasets/index.jsp).        

We have curated the published literature through the end of December 2013.

###Release 8.5

  November 28th, 2013. This  release corresponds to Release 17.5  of EcoCyc. All data on  transcriptional regulation curated in our lab is the same in both  databases.

We added the tetrameric conformation for the transcriptional  regulator LsrR. In the presence of phosphorylated autoinducer 2 (AI-2),  the tetramer dissociates into dimers, and the interaction of LsrR with DNA is greatly  reduced [ Wu M et al. (2013)](http://www.ncbi.nlm.nih.gov/pubmed/23589368). We also added its inactive conformation, LsrR-AI-2 . Two new conformations, MetJ-MTA and MetJ-adenine, for the MetJ  transcriptional regulator were also added. The metabolites  5´-deoxy-5´-(methylthio) adenosine (MTA) and adenine (Ade) bind with high affinity to  MetJ, but their biological effects are not known [ Martí-Arbona R et al. (2012)](http://www.ncbi.nlm.nih.gov/pubmed/?term=22890386).

The summaries for NemR,RbsR, MarR, NrdR, ArcA, LsrR, PspF, and YpdB transcriptional regulators were updated.

In version 8.5, we made a major change to the main pages of  RegulonDB. The pages were reorganized to provide a more structured  access to the data, based on the         two dominant types of users: those conducting individual search  queries and those accessing the data collections.

We also added the option "Gensor Unit Groups" within the  Integrated views & Tools menu, which enables display of all Gensor  Units so far reviewed in RegulonDB.         Currently, we have 53 GUs, and they are grouped into 5  categories.



###Release 8.3

  July 29th, 2013. This release  corresponds to Release 17.1  of EcoCyc. All data on transcriptional  regulation curated in our lab is the same in both databases.

As part of our curation on transcriptional regulation, we have  finished linking references to their corresponding evidence for 225  promoters in which this relationship did not exist.        

We have corrected and relocated the transcription factor binding sites of PuuR. The BSs of PuuR identified by Nemoto et al. consist of  15 nucleotides, with the following recognition sequence: AAAATATAATGAACA [ Nemoto et al. (2012)](http://www.ncbi.nlm.nih.gov/pmc/articles/PMC3434745/pdf/zjb3437.pdf).  Analysis done by the curator on the experimental assays and the  sequences identified by Nemoto et al., showed that the binding sites of  PuuR may have a length of 20 nucleotides with an inverted repeated symmetry (ATGG<u>A</u>C<u>AATATA</u>T<u>TGA</u>C<u>CA</u>T). The consensus sequence identified by Nemoto et al. in 2012 is included in the consensus sequence proposed by the curator and the nucleotides conserved between the two sequences are underlined.        

###Release 8.2

 April 22th, 2013. This release corresponds to Release 17.0  of EcoCyc. All data on transcriptional  regulation curated in our lab is the same in both databases.

Four new transcription factors have been identified, PgrR, RcdA, YdfH, and YpdB; the functional conformation for IscR has been included  and we enriched summaries for nine TFs as detailed below.        

PgrR, a repressor of the expression of genes related to peptidoglycan degradation [ Shimada et al. (2013)](http://onlinelibrary.wiley.com/doi/10.1111/gtc.12026/pdf).         RcdA is involved in the regulation of a number of stress  response genes, biofilm formation and of transcription regulators         genes [ Shimada et al. (2012)](http://www.ncbi.nlm.nih.gov/pmc/articles/PMC3535384/pdf/mbo30001-0381.pdf). YdfH belongs to the GntR transcription factor family is a repressor of the *rspAB* operon |CITS:[22972332]| and YpdB, an activator that participates in the carbon control network and may  participate in nutrient scavenging before entry         into stationary phase [ Fried et al. (2013)](http://jb.asm.org/content/195/4/807.full.pdf+html).        

The new conformation IscR-2Fe-2S for the transcription factor  IscR was included in this release. IscR-2Fe-2S represses the  transcription of the operon *iscRSUA*, which encodes genes for the Fe-S cluster biogenesis pathways [ Giel et al. (2013)](http://onlinelibrary.wiley.com/doi/10.1111/mmi.12052/pdf).        

Summaries for FadR, NikR, BluR, LeuO, HNS, MarA, SoxS, Rob and  PspF were enriched. In addition, it was determined that MqsRA complex  does not bind to DNA instead it functions to destabilize the MqsA-DNA complex [Brown et al. (2013)](http://www.jbc.org/content/288/2/1286.full.pdf+html).        

We have reclassified the evidence supporting the knowledge in the database as weak, strong, or confirmed [ Weiss et al. (2013)](http://www.ncbi.nlm.nih.gov/pmc/articles/PMC3548332/pdf/bas059.pdf). The level of confidence is assigned in two stages; in stage I we classify single evidence into weak and strong, and in stage II we  validate data by integrating multiple evidence items in a process termed "analytical cross-validation," where the result is the  confidence of the knowledge (strong, weak, or confirmed), see the page  regarding [evidence](http://regulondb.ccg.unam.mx/menu/about_regulondb/evidence_classification/index.jsp). This process has been automated to report relevant changes in each release.        

In the gene page, we have created a new section named "Elements  in the selected gene context region unrelated to any object in  RegulonDB." In this section are included the biological objects that are not associated with a transcription  unit.        

In addition, in the same page in the operon section, called  operon arrangement, are links to the operon page.  Each promoter field  is linked with the corresponding operon page. In the submenu related to the data sets, included in downloads,  we have integrated new information related to the transcription start  sites (TSSs) experimentally determined in  the laboratory of Dr. Morett. The TSSs are included in the file  named "High-throughput transcription initiation mapping. Illumina  directional RNA-seq experiments where total RNA received different treatments to enrich for 5'-monophosphate or  5'-triphosphate ends. "These objects are included in the new section,  "Elements in the selected gene context region         unrelated to any object in RegulonDB," previously described.        

In addition, HTTIM evidence has been removed, and associated  promoters with this evidence have been reclassified as follows: 267 as  TIM, 42 as ROMA, and 39 as RS (classification based on Weiss HTP evidence; [ Weiss et al. (2013)](http://www.ncbi.nlm.nih.gov/pmc/articles/PMC3548332/pdf/bas059.pdf). 



###Release 8.1

  December 17th, 2012. This  release corresponds to Release 16.5  of EcoCyc. All data on  transcriptional regulation curated in our lab is the same in both  databases.

We have annotated 35 predictions for TFBSs of 13 regulators. The matrices used for these predictions were constructed by RegulonDB database  [Medina-Rivera et al. (2010)](http://www.ncbi.nlm.nih.gov/pmc/articles/PMC3035439/pdf/gkq710.pdf). Four TFs (ArgR, AscG, Cra and Rob) have regulatory interactions  with weak evidence and interactions for eight regulators have with  strong evidence: CRP, EvgA, ExuR, FIS, LexA, NtrC, PhoP, TorR, and UxuR.        

A new response regulator, YehT, of two component system was curated [Kraxenberger et al. (2012)](http://jb.asm.org/content/194/16/4272.full.pdf+html).         

We have identified that  *mntS* is included within the coding region of the *rybA* gene. *rybA* transcribes two different functional products, a small RNA (*rybA*) and a small protein (MntS), both are transcribed from the *rybA* promoter  [Waters et al. (2011)](http://www.ncbi.nlm.nih.gov/pmc/articles/PMC3194919/pdf/zjb5887.pdf). RybA is rapidly processed at the 5´end as well as at multiple sites at the 3´end.         

We have completed adding references and evidence codes to 85  transcriptional Regulatory_Interactions. Now every manually curated  Regulatory_Interaction has a reference and an evidence code associated  with it. We continued to enrich the summaries of ten TFs: AraC, ChbR,  IscR, LacI, MarA, NorR, PhoB, RcnR, Rob and SdiA. 



###Release 8.0

October 2nd, 2012.                                                                

**High-level curation**
We describe next, two elements of our efforts toward  obtaining higher integration levels: (i) GUs and (ii) the organization  of multiple TFBSs into regulatory phrases.        

**Fur, a complex gensor unit**

In 2011, we described the new concept of genetic  sensory-response units, or "gensor units", (GUs) which are composed of  four components: (i) the signal, (ii) the signal-to-effector reactions that end with activation or  inactivation of the TF, (iii) the regulatory switch (resulting in  activation or repression of transcription            of target genes), and (iv) the consequence, i.e., the  effects and roles of the regulated genes.         

RegulonDB contains 25 completed GUs for local TFs and small  regulons. We curated a much larger GU as a first step toward eventually  compiling information on GUs of global            regulators. Fur regulates transcription initiation of 66  TUs, including 9 TFs, a regulatory small RNA (sRNA), and  two sigma  factors (σ19 and σ38). Its diagram has more than            200 reactions and close to 300 nodes. In order to facilitate interpretation of this GU, we included a high-level illustration that  provides an overview of all classes of genes and functions subject to Fur regulation. Search gensor unit  in the main menu in RegulonDB and select Fur overview.        

**Regulatory phrases**

For years we have displayed the collection of sites in  upstream regions affecting each promoter, leaving it to the user to  decipher how these multiple sites, which bind            the same or different TFs, work in a coordinated fashion, or not, to regulate transcription.             We have implemented the first version of regulatory phrases, grouping transcription factor binding sites (TFBSs) that work together  in a single promoter, as well as by grouping all            arrangements of the same TF with the same effect in  different promoters.

[**Enriched classifications based on classic and HT evidence**](http://regulondb.ccg.unam.mx/menu/about_regulondb/evidence_classification/index.jsp) 

We expanded the assignment of quality to various sources of  evidence, particularly for knowledge generated via high-throughput (HT)  technology. Based on our analysis of most relevant methods, we defined  rules for determining the quality of evidence when multiple independent  sources support an entry. See the new page of evidence in "About RegulonDB".        

[**Tracks display of HT data sets and submission forms for HT data sets**](http://regulondb.ccg.unam.mx:8888/cgi-bin/gb2/gbrowse/regulondb/) 

We implemented a new tool in the main menu for use of a browser with the option of several tracks, based on [GBrowser v.248](http://gbrowse.org/index.html).        

The menu page where users choose which sets to display now  contains a variety of data sets, including manually curated RegulonDB  collections of objects. We have also included a mechanism that enables the display of "Data Sets" in the GBrowser. On the GBrowser page, a user can proceed to "Select  tracks" to see the full set of options currently available, classified by type of object, including operons, TFs, Chip-Seq TFBSs, promoters, HT-mapped TSSs, sRNAs, and TF  conformations, among others. An additional category called "Genome regions", for genes as well  untranslated regions of 5´and  3´ends of TUs are also included.        

[**Submission forms for HT-datasets**](http://regulondb.ccg.unam.mx/menu/about_regulondb/submit_data/index.jsp) 

Every single data set can be documented as requested when  authors submit their experimental data, with specific formats for each  type of source (i.e., TSS, Chip-Seq). We implemented a Web format for those interested in submitting their data sets  directly online.         

**Evolutionary conservation of promoters and regulatory interactions**

For the first time, we have added the evolutionary evidence  for promoters and TFBSs within gammaproteobacteria. These are available  from the gene and regulon pages, with graphics showing a summary of the number of genomes where  conservation is found and the alignment and conserved sequences  available as multiple alignments.        

**A new Regulon page: addressing user needs and suggestions**

Based on comments and suggestions by RegulonDB users, we  modified the page displaying information about regulons and simplified  the search for all TFBSs of a single TF. The new page includes an icon linking a regulon to the GU,  the summary for the TF, followed by a section displaying the functional  and nonfunctional conformation(s), a classification of the effector based on its source as  internal, external, or dual; a category for the TF based on its  connectivity, the target regulated genes, and the operon where the TF gene belongs.  Subsequent sections  describe functional properties of the regulon, the set of TFBSs and  their organization patterns and phrases, logos, PWMs, and additional properties.

###Release 7.5

August  29th, 2012. 

This release corresponds to Release 16.0  of EcoCyc. All data on transcriptional regulation curated in our lab is the same in  both databases.                                    

We have updated the lengths and included the consensus  sequences of TFBSs for 17 regulators: AgaR, AraC, ArcA, AscG, CaiF,  DnaA, FhlDC, IclR, KdpE, LeuO, MalT, MelR, NanR, PrpR, PutA, RhaS, and  XylR.        

Three new transcription factors have been included: FliZ, MatA, and YjiE.        

FliZ is a repressor that contains an α-helix that is similar to helix 3.0 of σS and that represses genes involved in the regulation of the motility  system and curli expression.  Pesavento et al. in 2012 determined that  this regulator binds to regions of σS-dependent promoters, can recognize alternative σS promoter-like sequences, and can also discriminate vegetative promoters [Pesavento et al. 2012](http://nar.oxfordjournals.org/content/early/2012/02/08/nar.gks055.full.pdf+html).        

MatA is a transcriptional dual regulator in meningitis isolate *E. coli* strain IHE 3034, and it interferes with bacterial motility and flagellar synthesis in E. coli K-12 [Lehti et al. 2012](http://www.ncbi.nlm.nih.gov/pubmed/22422754). in E. coli K-12. Given the high similarity between the two strains, we  have added this regulator to the information for E. coli K-12.        

QseD, a putative transcriptional LysR-type regulator, was  renamed YjiE and is now considered a DNA-binding transcriptional dual  regulator. It regulates genes involved in cysteine and methionine  biosynthesis, sulfur metabolism, iron acquisition, and homeostasis [Gebendorfer et al. 2012](http://www.jbc.org/content/287/9/6892.full.pdf+html). A new function was identified for OxyR, in controlling genes under nitrosative stress during anaerobic respiration (Seth et al.  2012).         

###        Release 7.4    

March  29th, 2012.

This release corresponds to Release 16.0  of EcoCyc. All data on transcriptional regulation curated in our lab is the same in  both databases.

In this release we added the consensus sequences, lengths,  and symmetries corresponding to 10 TFs. We update the binding sites for 4 TFs that belong to the LysR family (ArgP, IlvY, MetR, and NhaR) and 3  response regulators that correspond to two-component systems (BaeR,  CitB, and CpxR); DinJ is included in the toxin/antitoxin system, and  PurR regulates genes involved in purine/pyrimidine biosynthesis.  Finally, PdhR is involved in central metabolic fluxes and, more  recently, has been found to be involved in the utilization of glycolate  and cell division. 

In these cases we used different strategies to identify the  characteristics of the TFBSs. We performed alignments of the sequences  upstream of genes regulated by these proteins and compared orthologous  intergenic regions, and we also used other databases, such as RegPrecise [Novichkov et al. 2010](http://www.ncbi.nlm.nih.gov/pmc/articles/PMC2808921/pdf/gkp894.pdf). In addition, the binding sites of the regulator MetR were corrected  based on comparisons with homologous sequences reported for *Salmonella typhimurium*. In all cases we also analyzed the available experimental evidence that corresponded to each regulatory interaction. 

On the other hand, we are continuing with the annotation of allosteric regulation of the RNAP by ppGpp and DksA. In this sense  we have expanded the notes for GreB, GreA and DksA. In addition we also  have enriched notes for different transcriptions factors, such as: AidB, ArgP, AtoC, DcuS, DpiB, Fur, HNS, LacI, MalT, MntR, PaaX, PhoB, PutA  and SoxS.

###        Release 7.3    

Nov  1st, 2011.

This release corresponds to Release 15.1 and 15.5 of  EcoCyc. All data on transcriptional regulation curated in our lab is the same in both databases.                                    

We continue with the effort to update and assign the correct lengths and central positions of the binding sites of TFs. In this  release we have analyzed consensus binding sequences for 20  transcription factors (TFs), and as a result we have corrected and  generated new regulatory interactions and updated the consensus  sequences, lengths, and symmetries of the transcription factor binding  sites (TFBSs). In these cases we used different strategies to identify  the characteristics of the TFBSs. We performed alignments of the  sequences upstream of genes regulated by these proteins and compared  orthologous intergenic regions. In all cases we also analyzed the  experimental evidence that corresponded to each regulatory interaction.          

We corrected and relocated the TFBSs of 7 response  regulators of the two-component systems: DcuR, EvgA, NtrC, OmpR, PhoB,  PhoP, and RstA. We updated the sites of 5 TFs involved in the acid  resistance system: BglJ, GadE, GadX, GadW, and RcsB. We added new  consensus sequences for 4 local TFs: SoxR, YqhC, YqjI, and CspA.        

The experimentally characterized TFBSs for the  transcriptional regulatory components of the HipBA, MqsAR, RelBE, and  YefM-YoeB toxin/antitoxin systems have been updated.        

On the other hand, we continue with the annotation of other  mechanisms of regulation. In this sense we have curated mechanisms of  regulation affecting allosterically RNA polymerase at transcription  initiation. ppGpp is a nucleotide that binds RNA polymerase alone or  forms a complex with DksA and affects transcription in either a positive or negative manner. Genes involved in responding to nutrient limitation as well as amino acid biosynthesis were positively affected by ppGpp  and DksA. The genes related to rRNA promoters and to the stringent  response were negatively controlled by both regulators. Currently, 67  promoter interactions regulated by ppGpp, as well as some regulated by  DksA, have been curated.         



###Release 7.2

May 6th, 2011. 

This release corresponds to Release 14.6 and 15.0 of EcoCyc. All data on transcriptional regulation curated in our lab is the same in both databases.
    
We are continuing the analysis of binding sites of different transcription factors (TFs). In this release we have included new consensus sequences for 45 local TFs that have three or fewer binding sites in the database. Most local TFs bind to small sequence motifs (11 to 24 nucleotides) with different symmetries, and these are arranged as inverted repeats (39), direct repeats (2), or asymmetrical (4) sequences with a variable space sequence between them. In these cases we performed alignments of the sequences upstream of the genes regulated by these proteins and evaluated the lengths and symmetries of the consensus sequences. In general, the sequences of unique binding sites are highly conserved, and the length and symmetry are evident.
    
TFs with inverted repeat symmetry include the following: AcrR, AllR, ArsR, AtoC, BaeR, BirA, BetI, CueR, CusR, EnvR, FabR, GlrR, HcaR, HyfR, KdgR IdnR, ilvY, LacI, LldR, MalI, MarR, MhpR, MntR, MurR, NadR, NemR, NikR, NorR, PrpR, RbsR, RcnR, TdcA, TreR, UhpA, UidR, YiaJ, YoeB-YefM, ZntR, and Zur.
    
TFs with directed repeat symmetry: CreB and MngR.
    
TFs with asymmetric symmetry: ChbR, RhaR, XapR, and ZraR.
    
Curation of transcription factors (TFs) for this release included updates to the summaries for MalT, UlaR, ArgR, MlrA, McbR, TreR, and YqhC. In addition, GO terms were updated for different TFs. The names of TFs were revised, and the category "DNA-binding" has been added.
    
On the other hand, a new TF, YqjI, has been added. The local regulator YqjI was reported to act as a repressor of the synthesis of an NADPH-dependent ferric reductase and its autorepression. Recently, Wang et al. described experimental evidence showing that this regulator maintains iron homeostasis in the presence of high levels of nickel Wang et al. 2011.
    
In this period we have completed the curation of the new Sensory Response Unit TyrR-L-tyrosine, L-phenylalanine involved in the synthesis and transport of aromatic amino acids.
    
Our publication concerning the Gensor Units Gama-Castro et al. (2011), corresponding to release 7.0, was chosen by the editors of Nucleic Acids Research to appear on their Featured Articles page: http://www.oxfordjournals.org/our_journals/nar/featured_articles.html.Feature Articles in Nucleic Acids Research represent the top 5% of papers in terms of significance, originality, and scientific excellence.
    
Our paper contains information for the release corresponding to 2008, 2009, and 2010.

###     Release 7.0
January 26th, 2011. 

This release corresponds to Release 14.5 of EcoCyc. All data on transcriptional regulation curated in our lab is the same in both databases.

In this database release version, our main goal was to model the regulatory pathways, including integration of the metabolic pathways with the different objects represented in the database. For this reason, RegulonDB has expanded the biological context, and we now refer to this integration in terms of genetic sensory response units, or Gensor Units (GUs) Gama-Castro et al. (2011).

The inclusion of Gensor Units brings a dramatic change and expansion of RegulonDB, due to the fact that we are adding several new types of interactions, reactions and superreactions that summarize concatenated sets of reactions, linked to the other databases that contain such information.

Gensor Units: An elementary genetic sensory response unit, or Gensor Unit, is formed by four components, all of them concatenated in a loop of processing of information that initiates with a signal or stimulus (i), which can be of external or internal origin. The second component is represented by the signal transduction pathway (ii), a concatenated set of reactions that affect gene expression. The third component is represented by the core of regulation or genetic switching (iii) and contains all regulatory elements necessary for modifying gene expression, inducing and or repressing a collection of regulated genes, and ends with an response (iv) that corresponds to the collection of biological capabilities derived from the affected gene products Gama-Castro et al. (2011).

We have now initiated the curation of five GUs related to the signal transduction of the sigma factors and 21 related to the two-component systems. And we have completed the curation of 15 GUs involved in carbon source utilization, and five involved in the metabolism of amino acids. 

​									**GUs related to the signal transduction of the sigma factors**.

| [Sigma19](http://regulondb.ccg.unam.mx/gensorunit?term=ECK125134950&organism=ECK12&format=jsp) | [Sigma24](http://regulondb.ccg.unam.mx/gensorunit?term=ECK125110291&organism=ECK12&format=jsp) | [Sigma28](http://regulondb.ccg.unam.mx/gensorunit?term=ECK125110292&organism=ECK12&format=jsp) | [Sigma32](http://regulondb.ccg.unam.mx/gensorunit?term=ECK125110293&organism=ECK12&format=jsp) | [Sigma38](http://regulondb.ccg.unam.mx/gensorunit?term=ECK125110294&organism=ECK12&format=jsp) |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |

​												**GUs related to the two-component systems**.

| [ArcA](http://regulondb.ccg.unam.mx/gensorunit?term=ECK12M000003&organism=ECK12&format=jsp) | [AtoC](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127849&organism=ECK12&format=jsp) | [BaeR ](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127847&organism=ECK12&format=jsp) | [CpxR](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127836&organism=ECK12&format=jsp) | [CreB ](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127833&organism=ECK12&format=jsp) |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| [CusR ](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127828&organism=ECK12&format=jsp) | [DcuR](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127823&organism=ECK12&format=jsp) | [DpiA ](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127817&organism=ECK12&format=jsp) | [EvgA ](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127814&organism=ECK12&format=jsp) | [KdpE](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127778&organism=ECK12&format=jsp) |
| [NarL](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127746&organism=ECK12&format=jsp) | [NarP](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127742&organism=ECK12&format=jsp) | [OmpR](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127735&organism=ECK12&format=jsp) | [PhoB ](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127731&organism=ECK12&format=jsp) | [PhoP ](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127727&organism=ECK12&format=jsp) |
| [QseB ](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127722&organism=ECK12&format=jsp) | [RcsB](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127718&organism=ECK12&format=jsp) | [RstA ](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127707&organism=ECK12&format=jsp) | [TorR](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127699&organism=ECK12&format=jsp) | [UhpA ](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127694&organism=ECK12&format=jsp) |
| [ZraR](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127679&organism=ECK12&format=jsp) |                                                              |                                                              |                                                              |                                                              |

​												**GUs related to carbon source utilization.**                

| [AlsR](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127857&organism=ECK12&format=jsp) | [AraC ](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127856&organism=ECK12&format=jsp) | [ChbR ](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127837&organism=ECK12&format=jsp) | [FucR](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127805&organism=ECK12&format=jsp) | [GatR](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127798&organism=ECK12&format=jsp) |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| [GntR](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127793&organism=ECK12&format=jsp) | [GutR-SrlR ](http://regulondb.ccg.unam.mx/gensorunit?term=ECK12M000018&organism=ECK12&format=jsp) | [IdnR](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127781&organism=ECK12&format=jsp) | [LacI ](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127776&organism=ECK12&format=jsp) | [MelR ](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127760&organism=ECK12&format=jsp) |
| [RbsR ](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127720&organism=ECK12&format=jsp) | [RhaS ](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127713&organism=ECK12&format=jsp) | [TreR](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127698&organism=ECK12&format=jsp) | [UidR](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127692&organism=ECK12&format=jsp) | [XylR ](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127689&organism=ECK12&format=jsp) |

​	

​											**GUs related to the metabolism of amino acids.**             

| [AlaS ](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127864&organism=ECK12&&format=jsp&type=gensorunit) | [ArgP](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127853&organism=ECK12&&format=jsp&type=gensorunit) | [ArgR ](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127854&organism=ECK12&&format=jsp&type=gensorunit) | [AsnC](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127850&organism=ECK12&&format=jsp&type=gensorunit) | [DsdC](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127819&organism=ECK12&format=jsp) |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [GcvA](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127796&organism=ECK12&format=jsp) | [MetJ](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127761&organism=ECK12&format=jsp) | [MetR](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127757&organism=ECK12&format=jsp) | [TrpR ](http://regulondb.ccg.unam.mx/gensorunit?term=GU0000127697&organism=ECK12&format=jsp) |                                                              |



Previously, the structure of this database was accessible  via the internet through four major navigation paths, by Genes, Operon,  Regulon, and Growth Condition, combining graphics and literature  information. Here, we provide three new types of searches: by Gensor  Unit, Sigmulon, and small RNA (sRNA).        

On the other hand, we have also corrected and relocated the  DNA binding sites for FhlA, Ada, CaiF, NhaR, and YiaJ. Initially, Leonhartsberger et al. in 2000 showed that FhlA  binds to inverted repeat sequences of 16 bp (CATTTCGTACGAAATG)  [Leonhartsberger et al. (2000)](http://onlinelibrary.wiley.com/doi/10.1046/j.1432-1327.2000.01399.x/pdf). However, our alignment results for all the regions that FhlA binds  showed that this sequence is not conserved. This result also showed that the motif TGTCGnnnnTGACA is conserved in the sequences examined, and  for this reason we have relocated, reassigned, and corrected the binding sites of the FhlA regulon in the database. The FhlA-binding sites are  represented in the database by an inverted repeat motif of 14 bp.        

In the cases of Ada and CaiF, we performed alignments of the sequences upstream of the genes regulated by these proteins and  evaluated the previous consensus sequences of the binding sites [Teo et al. (1986)](http://www.sciencedirect.com/science?_ob=ArticleURL&_udi=B6WSN-4C59B0W-24&_user=945819&_coverDate=04/25/1986&_rdoc=1&_fmt=high&_orig=search&_origin=search&_sort=d&_docanchor=&view=c&_acct=C000048981&_version=1&_urlVersion=0&_userid=945819&md5=ce12ab8943a1bcaa1e46eac76a16abb1&searchtype=a), [Nakamura et al. (1988)](http://www.sciencedirect.com/science?_ob=MImg&_imagekey=B6WK7-4FNG9CM-49-2&_cdi=6899&_user=945819&_pii=002228368890280X&_origin=search&_coverDate=08/05/1988&_sk=997979996&view=c&wchp=dGLzVlb-zSkzS&md5=2bed8746e15754d2fd899deac3d14acc&ie=/sdarticle.pd), [Buchet et al. (1999)](http://www.jbc.org/content/270/14/8285.full.pdf+html"_>Landini et al. (1995)), (href=_"http://onlinelibrary.wiley.com/doi/10.1046/j.1365-2958.1999.01622.x/pd). In addition, the lengths of the degenerate binding sites of NhaR were  defined according to the matrix shown for this regulator in the database RegPrecise. That database contains matrices generated from alignments  of orthologous regions  [Novichkov et al. (2010)](http://www.ncbi.nlm.nih.gov/pmc/articles/PMC2808921/pdf/gkp894.pdf).        

In 2000, [Ibañez et al](http://www.ncbi.nlm.nih.gov/pmc/articles/PMC94634/pdf/jb004617.). showed that transcription of the divergent operon  yiaJ-yiaKLMNO-lyxK-sgbHUE depends on the YiaJ repressor. However, those  authors suggested that this regulator binds a long region of 35 bp [Ibañez et al. (2000)](http://www.ncbi.nlm.nih.gov/pmc/articles/PMC94634/pdf/jb004617.). The alignment of this region with the orthologous sequence of Klebsiella pneumoniae showed a conserved palindrome of 21 bp [ Campos et al. (2008)](http://www.ncbi.nlm.nih.gov/pmc/articles/PMC2566198/pdf/0815-08.pdf). The position and length of the YiaJ-binding site reported in our database have been changed to reflect this.

A new portable drawing tool for genomic features is  available, as well as several new forms for downloading the data,  including web services, files for several relational database manager  systems, and files in BIOPAX format.   



###Release 6.8

 August 18, 2010. 

This release corresponds to Release 14.1 of EcoCyc. All data on transcriptional regulation curated in our lab is the same in both databases.                 

The motif obtained from aligning OxyR binding sites is highly  variable due to the length of sequences, even though, through  manipulation of the alignment it is possible to detect four conserved  regions. For this reason we have relocated, reassigned, and corrected  binding sites of the OxyR regulon, corresponding to 19 transcription  units. Toledano et al. (1994) showed that OxyR binds in tandem to four  ATAG elements and defines a consensus motif,  ATAGntnnnanCTATnnnnnnnATAGntnnnanCTAT covering around 40pb ([Toledano et al. (1994)](http://www.cell.com/retrieve/pii/S0092867494907021)).    

We now propose a new consensus sequence,  GATAGGTTnAACCTATCnnnnnGATAGGTTnAACCTATC, which contains two inverted  repeat motifs, GATAGGTTnAACCTATC, of 17 bp separated by 5 bp. This  sequence consensus is based on agreement of alignments realized by the  curator of these upstream regions and on the corresponding evidence,  obtained in the bibliography for every operon, including the similarity  to the consensus sequence, data from footprinting assays, computational  analysis of these sequences, and profiling of OxyR-dependent gene  expression. In the database the OxyR-binding sites are represented by an inverted repeat motif of 17 bp.        

During this last period, we have updated curation on  transcription initiation including publications until end of April,  2010.     



###    Release 6.7

March 24, 2010. This release corresponds to Release 14.0 of EcoCyc. All data on transcriptional regulation curated in our lab is the same in both databases.                    

​	We have corrected and relocated the binding sites of the CytR  transcription factor. This regulator 	negatively controls the expression  of genes that encode the proteins required for transport and utilization of ribonunucleosides and deoxyribonucleosides. The CytR binding sites  were previously represented as long regions which were determined by  footprinting of several promoter sequences.  

​	Computational analysis of these sequences showed that the  optimal CytR binding site consists of two octamer repeats, GTTGCATT, in  direct o invert orientation and preferably separated by 2 bp.  Experimental support of this consensus sequence was obtained from  footprinting, site-directed mutagenesis experiments and gene expression. ([Pedersen et al. (1997)](http://www.ncbi.nlm.nih.gov/pmc/articles/PMC1169813/pdf/002108.pdf), [Jorgensen et al. (1998)](http://www3.interscience.wiley.com/cgi-bin/fulltext/120194383/PDFSTART) ).  We have updated curation on transcription initiation including publications until end of December, 2009.      

​        **Genetic NetWorks**            

​        We have  different genetic networks available by using  pre-computed datasets, web services, dump 		files and direct connection to a mysql database.    








