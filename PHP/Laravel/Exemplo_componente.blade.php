<td title="Excluir registro">
    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#excluirModal{{ $id }}">X</button>
    <!-- Modal de Exclusão -->
    <div class="modal fade" id="excluirModal{{ $id }}" tabindex="-1" role="dialog" aria-labelledby="excluirModalLabel{{ $id }}" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <form action="{{ $deleteAction }}" method="POST">
                        <h5 class="modal-title" id="excluirModalLabel{{ $id }}">Excluir Registro?</h5>
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn-excluir">Sim</button>
                        <button type="button" class="btn-cancelar" data-bs-dismiss="modal">Não</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</td>