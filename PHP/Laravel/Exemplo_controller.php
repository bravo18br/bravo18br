<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class ControllerGetAll extends Controller
{
    public function getAll($rota)
    {
        try {
            switch ($rota) {
                case "veiculos":
                    return $this->getVeiculos();
                case "frota_total":
                    return $this->getFrotaTotal();
                case "recap_pneus":
                    return $this->getRecapPneus();
                case "linha":
                    return $this->getLinha();
                case "Depreciacao_Veiculos":
                    return $this->getDepreciacao_Veiculos();
                case "AIXa5_rve":
                    return $this->getAIXa5_rve();
                case "Custo_Total":
                    return $this->getCusto_Total();
                case "variaveis":
                    return $this->getVariaveis();
                case "vpp_linha":
                    return $this->getVPPLinha();
                default:
                    $response = Http::get(env('API_URL') . $rota);
                    $json_response = $response->json();
                    return view($rota, ['dados_' . $rota => $json_response]);
            }
        } catch (\Exception $e) {
            return $this->handleError($e);
        }
    }

    private function getVPPLinha()
    {
        try {
            $response3 = Http::get(env('API_URL') . 'vpp_linha');
            $response4 = Http::get(env('API_URL') . 'linha');

            if ($response3->successful() && $response4->successful()) {

                $json_vpp_linha = $response3->json();
                $json_linha = $response4->json();

                return view('vpp_linha', [
                    'dados_vpp_linha' => $json_vpp_linha,
                    'dados_linha' => $json_linha
                ]);
            } else {
                return $this->handleError('API Inalcançável', $response3->status());
            }
        } catch (\Exception $e) {
            return $this->handleError('API Inalcançável', $e);
        }
    }
    private function getVariaveis()
    {
        try {
            $response3 = Http::get(env('API_URL') . 'const_var');

            if ($response3->successful()) {

                $json_const_var = $response3->json();

                return view('variaveis', [
                    'dados_const_var' => $json_const_var
                ]);
            } else {
                return $this->handleError('API Inalcançável', $response3->status());
            }
        } catch (\Exception $e) {
            return $this->handleError('API Inalcançável', $e);
        }
    }
    private function getCusto_Total()
    {
        try {
            $response1 = Http::get(env('API_URL') . 'Custo_Variavel');
            $response2 = Http::get(env('API_URL') . 'Custo_Fixo');
            $response3 = Http::get(env('API_URL') . 'const_var');

            if ($response1->successful() && $response2->successful() && $response3->successful()) {
                $json_Custo_Variavel = $response1->json();
                $json_Custo_Fixo = $response2->json();
                $json_const_var = $response3->json();

                return view('Custo_Total', [
                    'dados_Custo_Variavel' => $json_Custo_Variavel,
                    'dados_Custo_Fixo' => $json_Custo_Fixo,
                    'dados_Const_Var' => $json_const_var
                ]);
            } else {
                return $this->handleError('API Inalcançável', $response1->status());
            }
        } catch (\Exception $e) {
            return $this->handleError('API Inalcançável', $e);
        }
    }
    private function getAIXa5_rve()
    {
        try {
            $response1 = Http::get(env('API_URL') . 'classe_veiculo');
            $response2 = Http::get(env('API_URL') . 'fn_AIXa2_kzt_remu_veic');
            $response3 = Http::get(env('API_URL') . 'fn_AIXa3_remu_veic');
            $response4 = Http::get(env('API_URL') . 'fn_AIXa4_remu_veic');
            $response5 = Http::get(env('API_URL') . 'fn_AIXa5_rve');

            if ($response1->successful() && $response2->successful() && $response3->successful() && $response4->successful() && $response5->successful()) {
                $json_classe_veiculo = $response1->json();
                $json_fn_AIXa2_kzt_remu_veic = $response2->json();
                $json_fn_AIXa3_remu_veic = $response3->json();
                $json_fn_AIXa4_remu_veic = $response4->json();
                $json_fn_AIXa5_rve = $response5->json();

                return view('AIXa5_rve', [
                    'dados_Vlr_Ref' => $json_classe_veiculo,
                    'dados_KZT' => $json_fn_AIXa2_kzt_remu_veic,
                    'dados_AIXA3' => $json_fn_AIXa3_remu_veic,
                    'dados_AIXA4' => $json_fn_AIXa4_remu_veic,
                    'dados_AIXA5' => $json_fn_AIXa5_rve
                ]);
            } else {
                return $this->handleError('API Inalcançável', $response1->status());
            }
        } catch (\Exception $e) {
            return $this->handleError('API Inalcançável', $e);
        }
    }
    private function getDepreciacao_Veiculos()
    {
        try {
            $response1 = Http::get(env('API_URL') . 'classe_veiculo');
            $response2 = Http::get(env('API_URL') . 'fn_AVIIIa_fm_dep_veic');
            $response3 = Http::get(env('API_URL') . 'fn_132b_classe_idade_do_veiculo');
            $response4 = Http::get(env('API_URL') . 'fn_AVIIIa_Dep_Veic_calculo');

            if ($response1->successful() && $response2->successful() && $response3->successful() && $response4->successful()) {
                $json_classe_veiculo = $response1->json();
                $json_fn_AVIIIa_fm_dep_veic = $response2->json();
                $json_fn_132b_classe_idade_do_veiculo = $response3->json();
                $json_fn_AVIIIa_Dep_Veic_calculo = $response4->json();

                return view('Depreciacao_Veiculos', [
                    'dados_Vlr_Ref' => $json_classe_veiculo,
                    'dados_AZT' => $json_fn_AVIIIa_fm_dep_veic,
                    'dados_Nr_por_Classe' => $json_fn_132b_classe_idade_do_veiculo,
                    'dados_Dep_Veiculos' => $json_fn_AVIIIa_Dep_Veic_calculo
                ]);
            } else {
                return $this->handleError('API Inalcançável', $response1->status());
            }
        } catch (\Exception $e) {
            return $this->handleError('API Inalcançável', $e);
        }
    }
    private function getVeiculos()
    {
        $responseVeiculo = Http::get(env('API_URL') . 'veiculo');
        $responseClasseVeiculo = Http::get(env('API_URL') . 'classe_veiculo');

        if ($responseVeiculo->successful() && $responseClasseVeiculo->successful()) {
            $data = $responseVeiculo->json();
            $opcoesClasse = $responseClasseVeiculo->json();
            return view('veiculos', ['dadosVeiculos' => $data, 'opcoesClasse' => $opcoesClasse]);
        } else {
            return $this->handleError('API Inalcançável', $responseVeiculo->status());
        }
    }

    private function getFrotaTotal()
    {
        try {
            $response1 = Http::get(env('API_URL') . 'fn_131_Class_veiculos_PT');
            $response2 = Http::get(env('API_URL') . 'fn_132a_tipologia_do_veiculo');
            $response3 = Http::get(env('API_URL') . 'fn_132b_classe_idade_do_veiculo');

            if ($response1->successful() && $response2->successful() && $response3->successful()) {
                $json_fn_131_Class_veiculos_PT = $response1->json();
                $json_fn_132a_tipologia_do_veiculo = $response2->json();
                $json_fn_132b_classe_idade_do_veiculo = $response3->json();

                return view('frota_total', [
                    'dadosClassePBT' => $json_fn_131_Class_veiculos_PT,
                    'dadosTipologia' => $json_fn_132a_tipologia_do_veiculo,
                    'dadosClasseIdade' => $json_fn_132b_classe_idade_do_veiculo
                ]);
            } else {
                return $this->handleError('API Inalcançável', $response1->status());
            }
        } catch (\Exception $e) {
            return $this->handleError('API Inalcançável', $e);
        }
    }

    private function getRecapPneus()
    {
        $responseRecap = Http::get(env('API_URL') . 'recap_pneus');
        $responseClasse = Http::get(env('API_URL') . 'classe_veiculo');

        if ($responseRecap->successful() && $responseClasse->successful()) {
            $dadosPneus = $responseRecap->json();
            $opcoesClasse = $responseClasse->json();
            return view('recap_pneus', ['dadosPneus' => $dadosPneus, 'opcoesClasse' => $opcoesClasse]);
        } else {
            return $this->handleError('API Inalcançável', $responseRecap->status());
        }
    }

    private function getLinha()
    {
        $responseLinha = Http::get(env('API_URL') . 'linha');
        $responseClasse = Http::get(env('API_URL') . 'classe_veiculo');

        if ($responseLinha->successful() && $responseClasse->successful()) {
            $dadosLinha = $responseLinha->json();
            $opcoesClasse = $responseClasse->json();
            return view('linha', ['dados_linha' => $dadosLinha, 'opcoesClasse' => $opcoesClasse]);
        } else {
            return $this->handleError('API Inalcançável', $responseLinha->status());
        }
    }

    private function handleError($message, $statusCode = null)
    {
        return view('error', ['message' => $message, 'statusCode' => $statusCode]);
    }
}
