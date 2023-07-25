import { Link } from "react-router-dom"

export function WRegulonDB() {
    return (
        <div>
            <h2>Introduction</h2>
            <div>
                <p>
                    <b>The Escherichia coli K-12 regulatory network</b>. A database is a model of a piece of the world.
                    In this sense, RegulonDB is a model of the regulation of transcription initiation and the regulatory network in <i>Escherichia coli</i> K-12.
                    It includes knowledge of the organization of the genes in transcription units, operons and simple and complex regulons.
                    <br />
                    <br />
                    <b>Highly detailed and incomplete knowledge jointly modeled</b>. An important aspect to keep in mind in order to avoid misunderstandings
                    in the content of a database, is the fact that the current characterization of different genes, operons and regulatory mechanisms, is quite variable.
                    For some genes, their mechanisms are very well described, whereas in most cases, our current knowledge is partial.
                    For instance, the regulation of many promoters is still unknown, or a well characterized promoter may be upstream of a poorly characterized operon
                    or transcription unit. Our definitions and conventions affect not only the way well-characterized systems are described,
                    but also the way the lack of information is as precisely as possible encoded in the database.
                    <br />
                    <br />
                    To this already complex picture, we have to add the more recent high throughput experimentally determined pieces of the network,
                    that sometimes challenge our classic paradigms.
                    <br />
                    <br />
                    <b>A limited and up to date curation</b>. We strive to maintain curation up to date.
                    However, due to different methodological reasons, we are far from encoding all knowledge available on mechanisms of transcription initiation.
                    In spite of our comprehensive curating of the major actors of transcriptional regulation (promoters, binding sites, transcription factors,
                    transcription units, operons and regulons), we estimate to encode around 20% of the knowledge present in the corpus of around 5,000
                    current papers supporting RegulonDB.
                </p>
            </div>
            <h2>On the graphic display of the different objects in RegulonDB.</h2>
            <p>
                The graphic display of an operon contains all the genes of its different transcription units, as well as all the regulatory elements involved in the transcription and regulation of those TUs. An operon is here conceived as a structural unit encompassing all genes and regulatory elements. An operon with several promoters located near each other may also have dual binding sites, indicating that such a site can activate one particular promoter, but repress a second one.
                <br />
                <br />
                In the same page, the collection of the different TUs is displayed below the operon. The graphic display of an operon contains all the genes of its different transcription units, as well as all the regulatory elements involved in the transcription and regulation of those TUs.
                <br />
                <br />
                The graphic display of a TU will always contain only one promoter -when known- with the binding sites that regulate its activity, followed by the transcribed genes. Note that dual sites are frequently displayed at a TU as repressors or activators. This is because the site will have a particular effect on the promoter of that TU.
            </p>
            <br />
            <Link to={"/releasesNote"} >Check the Releases notes</Link>
            <br />
            <Link to={"/summaryHistory"} >Check History Summary</Link>
            <br />
            <Link to={"/glossary"} >Check the glossary for all definitions</Link>
            <br />
            <a href="https://pubmed.ncbi.nlm.nih.gov/?term=RegulonDB" target="tab" > View publications </a>
        </div>
    )
}