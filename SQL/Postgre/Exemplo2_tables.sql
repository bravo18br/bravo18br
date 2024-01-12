CREATE TABLE public.tabela_ax7_grupo_b (
	id_tabela_ax7_grupo_b serial4 NOT NULL,
	abono_de_ferias numeric(6, 4) NULL,
	decimo_terceiro numeric(6, 4) NULL,
	aviso_previo numeric(6, 4) NULL,
	licenca_paternidade numeric(6, 4) NULL,
	licenca_funeral numeric(6, 4) NULL,
	licenca_casamento numeric(6, 4) NULL,
	adicional_noturno numeric(6, 4) NULL,
	CONSTRAINT tabela_ax7_grupo_b_pk PRIMARY KEY (id_tabela_ax7_grupo_b)
);