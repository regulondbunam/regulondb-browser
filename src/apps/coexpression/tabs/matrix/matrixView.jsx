import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_getCoexpressionRank } from '../geneCoexpression/coexpressionTable';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import "./matrix.css"
import { ColumnFill, fillCell } from './columnFill';
//import { RowMatrix } from './rowFill';



function descriptionProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function matrixIds(geneIdList, rankingIdList) {
    const cellNumber = (50 * geneIdList.length) + (geneIdList.length + 51)
    let ids = []
    let x = 0
    let y = 0
    for (let i = 0; i < cellNumber; i++) {
        let cell = ""
        let xRelative = x - 1
        let yRelative = y - 1

        if (x === 0 && y === 0) {
            cell = "firstCell"
        }

        if (y === 0 && x > 0) {
            cell = geneIdList[x - 1]
        }

        if (x === 0 && y > 0) {
            cell = "c_" + rankingIdList[y - 1]
        }

        if (x > 0 && y > 0) {
            cell = geneIdList[xRelative] + "_" + rankingIdList[yRelative]
        }

        ids.push(cell)

        if (x === geneIdList.length) {
            x = 0
            y++
        } else {
            x++
        }

    }
    return ids
}

function idTopData(topData = []) {
    if (!Array.isArray(topData)) {
        return []
    }
    let idList = []
    topData.forEach(coexpressionData => {
        let idGene = coexpressionData.gene[0]._id;
        idList.push(idGene);
    });
    return idList
}

function MatrixView({ geneIdList, query }) {

    const [tabValue, setTabValue] = React.useState(0);
    const [selectedGene, setSelectedGene] = React.useState(geneIdList[0]);
    const { loading, error, data } = useQuery(QUERY_getCoexpressionRank, {
        variables: {
            id: selectedGene
        }
    });

    const rankingIdList = idTopData(data?.getTopCoexpressionRanking);
    //const [getTopCoexpressionRanking, { loading: loadNext, error: errorNext, data: dataNext }] = useLazyQuery(QUERY_getRankFromGeneList);
    let gridTemplateColumns = geneIdList.map(() => ("150px")).join(" ") + " 150px"
    const handleChange = (event, newValue) => {
        setSelectedGene(geneIdList[newValue])
        setTabValue(newValue);
    };
    return (
        <Box sx={{ bgcolor: 'background.paper' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <h2 style={{ color: "#3d779b" }}>Coexpression Matrix</h2>
                <Tabs
                    value={tabValue}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {query.map((gene, index) => {

                        const InnerTab = <div dangerouslySetInnerHTML={{ __html: gene.name }}></div>

                        return <Tab key={"matrixTab" + gene.id} icon={InnerTab} {...descriptionProps(index)} />
                    })}
                </Tabs>
                <br />
            </Box>
            {loading && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <CircularProgress />
                    </div>
                </div>
            )}
            <div>
                {
                    data?.getTopCoexpressionRanking && (
                        <Matrix query={query} getTopCoexpressionRanking={data.getTopCoexpressionRanking} geneIdList={geneIdList} rankingIdList={rankingIdList} gridTemplateColumns={gridTemplateColumns} />
                    )
                }
            </div>


        </Box>


    );
}
export default MatrixView;

function Matrix({ query, getTopCoexpressionRanking, geneIdList, rankingIdList, gridTemplateColumns }) {
    const [rank, setRank] = React.useState(false);
    const [data, setData] = React.useState()

    function updateData(geneId, dat) {
        let dt
        if (data) {
            dt = data
            dt[geneId] = dat
        } else {
            dt = {}
            dt[geneId] = dat
        }
        setData(dt)
    }

    React.useEffect(() => {
        if (rank) {
            query.forEach(gene => {
                const cell = document.getElementById(gene.id)
                if (cell) {
                    cell.innerHTML = gene.name
                    cell.className = "titleCells"
                }
            })
            getTopCoexpressionRanking.forEach(coexpression => {
                const gene = coexpression.gene[0]
                const cell = document.getElementById("c_" + gene._id)
                if (cell) {
                    cell.innerHTML = gene.name
                    cell.className = "titleCells"
                }
            })
            if (data) {
                query.forEach(gene => {
                    if (data[gene.id]) {
                        fillCell(gene.id, data[gene.id])
                    }

                })
            }
        }
        setRank(true)

        return () => {
            setRank(false)
        }

    }, [query, rank, getTopCoexpressionRanking, data]);

    return (
        <div style={{ display: "grid", gridTemplateColumns: gridTemplateColumns }} id="matrixContainer">
            {
                matrixIds(geneIdList, rankingIdList).map((id, index) => {
                    let key = "matrixCell_" + index + "_" + id
                    return <div className='cellMatrix' key={key} id={id}>{" "}</div>
                })
            }
            {
                rank && (geneIdList.map((geneId, index) => {
                    return <ColumnFill key={"column_" + geneId + "_" + index} geneId={geneId} rankingIdList={rankingIdList} getData={(dt) => { updateData(geneId, dt) }} />
                }))
            }
        </div>
    )
}