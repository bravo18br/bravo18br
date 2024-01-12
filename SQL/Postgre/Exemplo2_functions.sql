CREATE OR REPLACE FUNCTION public.fn_21avi_km_prog_classe_veiculo()
 RETURNS SETOF fn_21avi_km_prog_classe_veiculo_tipo
 LANGUAGE plpgsql
AS $function$
declare
	retorno fn_21avi_km_prog_classe_veiculo_tipo;
	dt_ini date;
	dt_fin date;
	ikm numeric(5,2); -- IKm é a quilometragem ociosa no mês m, limitada a 5% da quilometragem produtiva (busca na tabela de constantes e variaveis "public.const_var") 
	var1 record; -- variavel do tipo row, pra receber as linhas do for
	var2 record;
	var4 numeric(12,2);
	var5 numeric(12,2);
	var6 numeric(12,2);
	var7 numeric(12,2);
	var8 numeric(12,2);
	var9 numeric(12,2);
	per_meses integer;
	km_total_linha numeric(12,2);
begin
	----- populando as constantes
	select (cv.ikm_const) from public.const_var cv where cv.id_const_var =1 into ikm; -- busca o valor do IKM na tabela de const_var
	select (cv.data_inicio) from public.const_var cv where cv.id_const_var =1 into dt_ini; -- busca o valor da data inicial na tabela de const_var
	select (cv.data_final) from public.const_var cv where cv.id_const_var =1 into dt_fin; -- busca o valor da data final na tabela de const_var

			------------------------------------------------------------------
			-- esse if converte a data inicial e final em período de meses
			------------------------------------------------------------------
			if to_char(age(dt_fin+interval'1 month', dt_ini),'YY')<>'00' then
				per_meses:=(to_char(age(dt_fin+interval'1 month', dt_ini),'YY')::integer)*12;
				per_meses:=per_meses::integer+(to_char(age(dt_fin+interval'1 month', dt_ini),'MM'))::integer;
			else
				per_meses:=to_char(age(dt_fin+interval'1 month', dt_ini),'MM');
			end if;
		
	--Tabela temporária 2.1.a.vi KPz: média mensal da quilometragem programada para cada tipo de veículo
	CREATE TEMPORARY TABLE tmp_table_fn_21avi_km_prog_classe_veiculo (
	classe_nm varchar, -- nome da classe
    ar_c varchar, -- ar condicionado
    trans varchar, -- tipo de transmissão
    km_rota numeric(12,2) -- valor calculado depreciação =(1 - classe_veiculo.vlr_residual_veiculo)*(classe_veiculo.vd_util_veiculo - fe_fin + 1)/55/12
    );
		
	for var1 in 
		select 
			cv.nm_clas_veiculo "nome_classe",
			cv.transmissao_veiculo "transmissao",
			cv.ar_cond_veiculo "ar_condicionado",
			l.nr_linha,
			l.nome_linha "linha",
			sum(kpd.dias_uteis_kp_por_dia) "campo3", 
			sum(kpd.sabado_kp_por_dia) "campo4",
			sum(kpd.domingo_kp_por_dia) "campo5",
			vl.dia_util_vpp_linha,
			vl.sab_vpp_linha,
			vl.dom_fer_vpp_linha,
			l.km_util_linha,
			l.km_sab_linha,
			l.km_dom_linha
		
			from public.linha l 

			join public.linha_kp_interligacao lki 
				on lki.id_linha = l.id_linha
			
			join public.kp_por_dia kpd 
				on kpd.id_kp_por_dia = lki.id_kp_por_dia
			
			join public.vpp_linha vl 
				on vl.id_linha_vpp_linha = l.id_linha
				
			join public.classe_veiculo cv 
				on cv.id_classe_veiculo = l.id_classe

		where ((vl.mes_ref_vpp_linha between dt_ini and dt_fin) AND	(kpd.mes_ano_kp_por_dia between dt_ini and dt_fin)) -- faz o filtro pelo período informado pelo cliente
				
				group by 1,2,3,4,5,9,10,11,12,13,14
				order by 1,2
		
		loop

			var4:=((var1.campo3/per_meses)*var1.dia_util_vpp_linha*var1.km_util_linha*ikm);  -- ik_du
			var5:=((var1.campo4/per_meses)*var1.sab_vpp_linha*var1.km_sab_linha*ikm); 	   -- ik_sab
			var6:=((var1.campo5/per_meses)*var1.dom_fer_vpp_linha*var1.km_dom_linha*ikm);    -- ik_dom
			var7:=((var1.campo3/per_meses)*var1.dia_util_vpp_linha*var1.km_util_linha+var4); -- kp_du
			var8:=((var1.campo4/per_meses)*var1.sab_vpp_linha*var1.km_sab_linha+var5); 	   -- kp_sab
			var9:=((var1.campo5/per_meses)*var1.dom_fer_vpp_linha*var1.km_dom_linha+var6);   -- kp_dom
					
			km_total_linha:=((var7/per_meses)+(var8/per_meses)+(var9/per_meses));
			
			insert into tmp_table_fn_21avi_km_prog_classe_veiculo values (var1.nome_classe, var1.ar_condicionado, var1.transmissao, km_total_linha);
	--		retorno:=(var1.nome_classe, var1.ar_condicionado, var1.transmissao, km_total_linha);
	--		return next retorno;	
		end loop;
	
	for var2 in 
		select 
			classe_nm,
			ar_c,
			trans,
			sum(km_rota) "km_tot"
		from tmp_table_fn_21avi_km_prog_classe_veiculo
		group by 1,2,3
	loop
		retorno:=(var2.classe_nm, var2.ar_c, var2.trans, var2.km_tot);
		return next retorno;
	end loop;

	drop table tmp_table_fn_21avi_km_prog_classe_veiculo;
	return;
end;
$function$
;
