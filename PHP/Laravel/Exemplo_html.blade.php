@extends('layout_base')
@section('conteudo')
<section class="section-container">
    @include('components.cabecalho', [
    'titulo'=>'Classes de Veículos'
    ])
    <div class="div_section">
        <button type="button" class="btn btn-new" data-bs-toggle="modal" data-bs-target="#novoModal">Novo</button>
    </div>
    <div class="modal fade" id="novoModal" tabindex="-1" role="dialog" aria-labelledby="novoModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="novoModalLabel">Novo Registro</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                </div>
                <div class="modal-body">
                    <form action="{{ url(env('APP_URL')) . 'classe_veiculo/'}}" method="POST">
                        @csrf
                        @method('POST')
                        <table>
                            <tbody>
                                <tr>
                                    <td><label for="novoClasse">Classe:</label></td>
                                    <td><input type="text" id="novoClasse" name="nm_clas_veiculo" value="Novo Nome de Classe"></td>
                                </tr>
                                <tr>
                                    <td><label for="novoTransm">Transmissão:</label></td>
                                    <td><select id="novoTransm" name="transmissao_veiculo">
                                            <option value="Manual">Manual</option>
                                            <option value="Automatico">Automática</option>
                                        </select></td>
                                </tr>
                                <tr>
                                    <td><label for="novoAr">Ar Condicionado:</label></td>
                                    <td><select id="novoAr" name="ar_cond_veiculo">
                                            <option value="Presente">Presente</option>
                                            <option value="Ausente">Ausente</option>
                                        </select></td>
                                </tr>
                                <tr>
                                    <td><label for="novoCAP">Capacidade:</label></td>
                                    <td><input type="number" id="novoCAP" name="cap_pass_veiculo" value="70"></td>
                                </tr>
                                <tr>
                                    <td><label for="novoPBT">PBT:</label></td>
                                    <td><input type="number" id="novoPBT" name="pbt_minimo_veiculo" value="16"></td>
                                </tr>
                                <tr>
                                    <td><label for="novoCT">Comp Max:</label></td>
                                    <td><input type="number" id="novoCT" name="comp_tot_max_veiculo" value="14"></td>
                                </tr>
                                <tr>
                                    <td><label for="novoCCMin">Cons Comb Mín:</label></td>
                                    <td><input type="number" id="novoCCMin" name="cc_min_veiculo" step="0.01" value="0.37"></td>
                                </tr>
                                <tr>
                                    <td><label for="novoCCMax">Cons Comb Máx:</label></td>
                                    <td><input type="number" id="novoCCMax" name="cc_max_veiculo" step="0.01" value="0.41"></td>
                                </tr>
                                <tr>
                                    <td><label for="novoValorClasse">Valor Classe:</label></td>
                                    <td><input type="number" id="novoValorClasse" name="vlr_clas_veiculo" value="465000"></td>
                                </tr>
                                <tr>
                                    <td><label for="novoVidaUtil">Vida Útil:</label></td>
                                    <td><input type="number" id="novoVidaUtil" name="vd_util_veiculo" value="10"></td>
                                </tr>
                                <tr>
                                    <td><label for="novoValorResidual">Valor Residual:</label></td>
                                    <td><input type="number" id="novoValorResidual" name="vlr_residual_veiculo" step="0.01" value="0.10"></td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="submit" class="btn-enviar">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
<div class="body_div_container">
@foreach($dados_classe_veiculo as $linha)
<div class="body_div_container2">
    <table>
        <thead>
            <h5>Classe: {{ $linha['nm_clas_veiculo'] }} / ID: {{ $linha['id_classe_veiculo'] }} / Transmissão: {{ $linha['transmissao_veiculo'] }} / Ar Cond: {{ $linha['ar_cond_veiculo'] }}</h5>
            <tr>
                <th title="Capacidade de passageiros">Cap</th>
                <th title="Peso Bruto Total Mínimo">PBT Mín</th>
                <th title="Comprimento Total Máximo">CT Máx</th>
                <th title="Consumo de Combustível Mínimo">CC Mín</th>
                <th title="Consumo de Combustível Máximo">CC Máx</th>
                <th title="Valor do Veículo dessa Classe">Valor</th>
                <th title="Vida Útil estimada em ANOS">Vida Útil</th>
                <th title="Valor Residual">VR</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ $linha['cap_pass_veiculo'] }}</td>
                <td>{{ $linha['pbt_minimo_veiculo'] }} ton</td>
                <td>{{ $linha['comp_tot_max_veiculo'] }} metros</td>
                <td>{{ $linha['cc_min_veiculo'] }}</td>
                <td>{{ $linha['cc_max_veiculo'] }}</td>
                <td>R$ {{ number_format($linha['vlr_clas_veiculo'], 0, ',', '.') }}</td>
                <td>{{ $linha['vd_util_veiculo'] }} anos</td>
                <td>{{ $linha['vlr_residual_veiculo'] }}</td>

                @include('components.delete-button', [
                'id' => $linha['id_classe_veiculo'],
                'deleteAction' => url('classe_veiculo', ['id' => $linha['id_classe_veiculo']])
                ])

                <td title="Editar registro">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editarModal{{ $linha['id_classe_veiculo'] }}">E</button>
                    <!-- Modal de Edição -->
                    <div class="modal fade" id="editarModal{{ $linha['id_classe_veiculo'] }}" tabindex="-1" role="dialog" aria-labelledby="editarModalLabel{{ $linha['id_classe_veiculo'] }}" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="editarModalLabel{{ $linha['id_classe_veiculo'] }}">Editar Registro</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                                </div>
                                <div class="modal-body">
                                    <form action="{{ url(env('APP_URL') . 'classe_veiculo/' . $linha['id_classe_veiculo']) }}" method="POST">
                                        @csrf
                                        @method('PUT')
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td><label for="editarClasse">Classe:</label></td>
                                                    <td><input type="text" id="editarClasse" name="nm_clas_veiculo" value="{{ $linha['nm_clas_veiculo'] }}"></td>
                                                </tr>
                                                <tr>
                                                    <td><label for="editarTransm">Transmissão:</label></td>
                                                    <td><select id="editarTransm" name="transmissao_veiculo">
                                                            <option value="Manual">Manual</option>
                                                            <option value="Automatico">Automática</option>
                                                        </select></td>
                                                </tr>
                                                <tr>
                                                    <td><label for="editarAr">Ar Condicionado:</label></td>
                                                    <td><select id="editarAr" name="ar_cond_veiculo">
                                                            <option value="Ausente">Ausente</option>
                                                            <option value="Presente">Presente</option>
                                                        </select></td>
                                                </tr>
                                                <tr>
                                                    <td><label for="editarCAP">Capacidade:</label></td>
                                                    <td><input type="number" id="editarCAP" name="cap_pass_veiculo" value="{{ $linha['cap_pass_veiculo'] }}"></td>
                                                </tr>
                                                <tr>
                                                    <td><label for="editarPBT">PBT:</label></td>
                                                    <td><input type="number" id="editarPBT" name="pbt_minimo_veiculo" value="{{ $linha['pbt_minimo_veiculo'] }}"></td>
                                                </tr>
                                                <tr>
                                                    <td><label for="editarCT">Comp Max:</label></td>
                                                    <td><input type="number" id="editarCT" name="comp_tot_max_veiculo" value="{{ $linha['comp_tot_max_veiculo'] }}"></td>
                                                </tr>
                                                <tr>
                                                    <td><label for="editarCCMin">Cons Comb Mín:</label></td>
                                                    <td><input type="number" id="editarCCMin" name="cc_min_veiculo" step="0.01" value="{{ $linha['cc_min_veiculo'] }}"></td>
                                                </tr>
                                                <tr>
                                                    <td><label for="editarCCMax">Cons Comb Máx:</label></td>
                                                    <td><input type="number" id="editarCCMax" name="cc_max_veiculo" step="0.01" value="{{ $linha['cc_max_veiculo'] }}"></td>
                                                </tr>
                                                <tr>
                                                    <td><label for="editarValorClasse">Valor Classe:</label></td>
                                                    <td><input type="number" id="editarValorClasse" name="vlr_clas_veiculo" value="{{ $linha['vlr_clas_veiculo'] }}"></td>
                                                </tr>
                                                <tr>
                                                    <td><label for="editarVidaUtil">Vida Útil:</label></td>
                                                    <td><input type="number" id="editarVidaUtil" name="vd_util_veiculo" value="{{ $linha['vd_util_veiculo'] }}"></td>
                                                </tr>
                                                <tr>
                                                    <td><label for="editarValorResidual">Valor Residual:</label></td>
                                                    <td><input type="number" id="editarValorResidual" name="vlr_residual_veiculo" step="0.01" value="{{ $linha['vlr_residual_veiculo'] }}"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <button type="submit" class="btn-enviar">Salvar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>

            </tr>
            
        </tbody>
       
    </table>
    </div>
    @endforeach
</div>
@endsection