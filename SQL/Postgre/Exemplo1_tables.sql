CREATE TABLE public.linha (
	id_linha serial4 NOT NULL,
	id_classe int4 NOT NULL DEFAULT 1,
	nr_linha int4 NOT NULL,
	nome_linha varchar NOT NULL,
	km_util_linha numeric(7, 2) NULL DEFAULT 0.0,
	km_sab_linha numeric(7, 2) NULL DEFAULT 0.0,
	km_dom_linha numeric(7, 2) NULL DEFAULT 0.0,
	CONSTRAINT linha_pkey PRIMARY KEY (id_linha),
	CONSTRAINT linha_fk FOREIGN KEY (id_classe) REFERENCES public.classe_veiculo(id_classe_veiculo) ON DELETE CASCADE ON UPDATE CASCADE
);