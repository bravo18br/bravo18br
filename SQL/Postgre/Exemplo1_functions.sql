CREATE OR REPLACE FUNCTION public.fn_132b_classe_idade_do_veiculo()
 RETURNS SETOF fn_132b_classe_idade_do_veiculo_tipo
 LANGUAGE plpgsql
AS $function$
declare 
	var1 record;
	retorno fn_132b_classe_idade_do_veiculo_tipo;
	dt_ini date;
begin 
	
	----- populando as constantes
	select (cv.data_inicio) from public.const_var cv where cv.id_const_var =1 into dt_ini; 
	
	for var1 in 
		select 
			public.classe_veiculo.nm_clas_veiculo "Classe Veículo (PT)", -- Classificação dos veículos (nome)
			public.classe_veiculo.transmissao_veiculo "Transm", -- se tem ou não transmissão automática
			public.classe_veiculo.ar_cond_veiculo "Ar Cond", -- se tem ou não ar-condicionado
			fn_calcula_idade.anos_veic,
			count(public.veiculo.id_veiculo) "Qnt" -- agrupado por quantidade de veículos de cada tipo
		from public.classe_veiculo
			join public.veiculo
				on public.classe_veiculo.id_classe_veiculo = public.veiculo.id_clas_veiculo
			join fn_calcula_idade ()
				on public.veiculo.id_veiculo = fn_calcula_idade.id_veic
				where public.veiculo.dt_fab_veiculo < dt_ini
			
			group by 1,2,3,4
			order by 4
		
		loop 
			retorno:=var1;
			return next retorno;
		end loop;
			return;
end;
$function$
;
