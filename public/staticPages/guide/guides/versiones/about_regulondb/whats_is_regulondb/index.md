#What is RegulonDB?

### Introduction

__The Escherichia coli K-12 regulatory network__. A database is a model of a piece of the world. In this sense, RegulonDB is a model of the regulation of transcription initiation and the regulatory network in _Escherichia coli_ K-12. It includes knowledge of the organization of the genes in transcription units, operons and simple and complex regulons.



__Highly detailed and incomplete knowledge jointly modeled__. An important aspect to keep in mind in order to avoid misunderstandings in the content of a database, is the fact that the current characterization of different genes, operons and regulatory mechanisms, is quite variable. For some genes, their mechanisms are very well described, whereas in most cases, our current knowledge is partial. For instance, the regulation of many promoters is still unknown, or a well characterized promoter may be upstream of a poorly characterized operon or transcription unit. Our definitions and conventions affect not only the way well-characterized systems are described, but also the way the lack of information is as precisely as possible encoded in the database.



To this already complex picture, we have to add the more recent high throughput experimentally determined pieces of the network, that sometimes challenge our classic paradigms.



__A limited and up to date curation__. We strive to maintain curation up to date. However, due to different methodological reasons, we are far from encoding all knowledge available on mechanisms of transcription initiation. In spite of our comprehensive curating of the major actors of transcriptional regulation (promoters, binding sites, transcription factors, transcription units, operons and regulons), we estimate to encode around 20% of the knowledge present in the corpus of around 5,000 current papers supporting RegulonDB.



### Definitions:

[Check the glossary for all definitions](http://regulondb.ccg.unam.mx/menu/using_regulondb/tutorials/project_glossary/index.jsp)

__Operon__

An operon is the set of one or several genes and their associated regulatory elements, which are transcribed as a single unit. The classical definition is that of a group of two or more genes transcribed as a polycistronic unit (Jacob and Monod, JMB, 1961).  For database purposes, we extend  the definition to include the possibility of operons with only one gene. 

Note: An operon is, therefore, a group of one or more contiguous genes transcribed in the same direction. 
Please note that given this definition, an operon must contain a promoter upstream of all genes and a terminator downstream. It is  also relatively common to find operons with several promoters, some of them internally located, thus transcribing a partial group of genes. In all cases so far, one gene belongs to only one operon.

The graphic display of an operon contains all the genes of its different transcription units, as well as all the regulatory elements involved in the transcription and regulation of those TUs. The genome browser shows genes and operons, accepting also monocistronic operons.

__Transcription unit (TU)__

A Transcription unit is a set of one or more genes transcribed from a single promoter. A TU may also include regulatory protein binding sites affecting this promoter and a terminator. Note: A complex operon with several promoters contains, therefore, several transcription units. Given the definition of an operon, at least one transcription unit must include all the genes in the operon.

__Promoter__

 A promoter is the DNA sequence where RNA polymerase binds and initiates transcription. Notes: Promoter sequences are specific to the different sigma factors associated to the RNA polymerase core. A promoter is represented as a stretch of upper-case nucleotide sequence, 60 bases upstream and 20 downstream from the precise initiation of transcription or +1. More recently, it has been identified that there are RNAP binding sites which do not initiate transcription. Following the definition, these are not promoters, since they are not functional.

__Binding site__

 The TFs binding sites are physical DNA sites recognized by transcription factors within a genome. Note: Historically, binding sites for transcriptional regulators were defined as operator sites. There are several meanings of an operator site. In their wider meaning, operator sites are sites for repressors or activators. Later on, the term "activator sites" was opposed to "operator sites", where operator sites were limited to sites for the binding of repressor regulators. In bacteria, specifically for Sigma 54 promoters, the term "UAS" for upstream activator sites is also used to refer to activator site that functions remotely. A related term is that of enhancers. An enhancer has been initially defined as an activator sites, tht functions from far upstream, and which functions in either orientations in relation to the promoter.

__Terminators__

The region where transcription ends, and RNAP unbinds from DNA.



### On the graphic display of the different objects in RegulonDB.

The graphic display of an operon contains all the genes of its different transcription units, as well as all the regulatory elements involved in the transcription and regulation of those TUs. An operon is here conceived as a structural unit encompassing all genes and regulatory elements. An operon with several promoters located near each other may also have dual binding sites, indicating that such a site can activate one particular promoter, but repress a second one.

In the same page, the collection of the different TUs is displayed below the operon. The graphic display of an operon contains all the genes of its different transcription units, as well as all the regulatory elements involved in the transcription and regulation of those TUs.

The graphic display of a TU will always contain only one promoter -when known- with the binding sites that regulate its activity, followed by the transcribed genes. Note that dual sites are frequently displayed at a TU as  repressors or activators. This is because the site will have a particular effect on the promoter of that TU.

If you want to review the way certain biological questions were answered through RegulonDB, you can go to [Flowcharts](http://regulondb.ccg.unam.mx/menu/using_regulondb/regulondb_flow_charts/index.jsp)

