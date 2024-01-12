import postgre from './Exemplo_backend_interface_postgre.js'
import getDMA from './model_Custo_Fixo_dma.js'
import getDOP from './model_Custo_Fixo_dop.js'
import get_AVIIIa_fm_dep_veic from './model_AVIIIa_fm_dep_veic.js'
import get_AIXa_Rem_Veiculos from './model_AIXa_Rem_Veiculos.js'
import * as math from 'mathjs'

async function getAll_Custo_Fixo() {
    try {
        const DVE = await getDVE()
        const RVE = await getRVE()
        const DOP = await getDOP()
        const DMA = await getDMA()
        const IOT = await getIOT()
        const GAR = await getGAR()
        const CLQ = await getCLQ()
        const CPS = math.evaluate(`${DOP} + ${DMA}`)
        const CRC = RVE
        const CDP = DVE
        const custo_fixo = math.evaluate(`${CLQ} + ${GAR} + ${IOT} + ${CPS} + ${CRC} + ${CDP}`)
        let resultado = {
            rows: {
                dve: DVE,
                rve: RVE,
                dop: DOP,
                dma: DMA,
                iot: IOT,
                gar: GAR,
                clq: CLQ,
                cps: CPS,
                crc: CRC,
                cdp: CDP,
                custo_fixo: custo_fixo
            }
        }
        resultado.sucesso = true
        resultado.existe = true
        resultado.rowCount = 1
        return resultado
    } catch (erro) {
        return { sucesso: false, erro }
    }
}

async function getRVE() {
    try {
        let AIXA4_total = 0
        const dados = await get_AIXa_Rem_Veiculos()
        const const_var = await postgre.select(`select * from public.const_var;`)
        const selic = parseFloat(const_var.rows[0].selic)
        const ipca = parseFloat(const_var.rows[0].ipca)
        const trc = math.evaluate(`${selic} - (${ipca}/2)`)
        for (const linha of dados.rows) {
            AIXA4_total += linha.aixa4_remu
        }
        const RVE = math.evaluate(`${AIXA4_total} * (${trc} / 100)`)
        return RVE
    } catch (error) {
        console.log(error)
    }
}

async function getDVE() {
    let depreciacao = 0
    const DVE = await get_AVIIIa_fm_dep_veic()
    for (const linha of DVE.rows) {
        depreciacao += linha.depreciacao
    }
    return depreciacao
}

async function getIOT() {
    // =2.1.c Insumos!F45
    const const_var = await postgre.select(`select * from public.const_var;`)
    const cte = parseFloat(const_var.rows[0].cte)
    return cte
}

async function getGAR() {
    // =2.1.c Insumos!F46
    const const_var = await postgre.select(`select * from public.const_var;`)
    const gar = parseFloat(const_var.rows[0].gar)
    return gar
}

async function getCLQ() {
    const const_var = await postgre.select(`select * from public.const_var;`)
    const clq = parseFloat(const_var.rows[0].lsb)
    return clq
}

export default getAll_Custo_Fixo