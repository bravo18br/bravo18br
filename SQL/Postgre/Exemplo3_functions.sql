CREATE OR REPLACE FUNCTION public.fn_aviiia_dep_veic(dt_veic date, id_clas_vei integer)
 RETURNS numeric
 LANGUAGE plpgsql
AS $function$
declare 
	fab_vei date;
	val_residual numeric(4,2);
	id_classe integer;
	vd_util_veic integer;
	dt_fin date;
	var1 numeric(11,10);
	var4 integer;
begin 
	-- Populando as variáveis / constantes
	fab_vei:=dt_veic;
	id_classe:=id_clas_vei;
	select cv.vlr_residual_veiculo from public.classe_veiculo cv where cv.id_classe_veiculo = id_classe into val_residual;
	select cv.vd_util_veiculo from public.classe_veiculo cv where cv.id_classe_veiculo = id_classe into vd_util_veic;
	select cv2.data_final from public.const_var cv2 where cv2.id_const_var = 1 into dt_fin;
	

	
			------------------------------------------------------------------
			-- esse if converte a idade do veiculo em período de meses
			------------------------------------------------------------------
			if to_char(age(dt_fin+interval'1 month', fab_vei),'YY')<>'00' then
				var4:=(to_char(age(dt_fin+interval'1 month', fab_vei),'YY')::integer)*12;
				var4:=var4::integer+(to_char(age(dt_fin+interval'1 month', fab_vei),'MM'))::integer;
			else
				var4:=to_char(age(dt_fin+interval'1 month', fab_vei),'MM');
			end if;
			------------------------------------------------------------------
			

			------------------------------------------------------------------------
			-- esse bloco converte a idade em meses do veiculo em anos (já ajustado)
			------------------------------------------------------------------------
			case
				when var4 between 0 and 12 then
					var4:=1;
				when var4 between 13 and 24 then
					var4:=2;
				when var4 between 25 and 36 then
					var4:=3;
				when var4 between 37 and 48 then
					var4:=4;
				when var4 between 49 and 60 then
					var4:=5;
				when var4 between 61 and 72 then
					var4:=6;
				when var4 between 73 and 84 then
					var4:=7;
				when var4 between 85 and 96 then
					var4:=8;
				when var4 between 97 and 108 then
					var4:=9;
				when var4 between 109 and 120 then
					var4:=10;
			else
				var4:=11;
			end case;

			
			------------------------------------------------------------------
		
		
		-- Calculo do valor da referencia, conforme tabela de referencia na documentação do projeto
		var1:=((1-val_residual)*(vd_util_veic-var4+1))/55/12;
	

return var1;
end;
$function$
;
