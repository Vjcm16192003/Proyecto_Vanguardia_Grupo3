PGDMP     2    4                |         	   user_info    15.4    15.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16456 	   user_info    DATABASE     �   CREATE DATABASE user_info WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE user_info;
                postgres    false            �            1259    16489    usuario    TABLE     �  CREATE TABLE public.usuario (
    user_id integer NOT NULL,
    fullname character varying(255) NOT NULL,
    weight numeric(5,2) NOT NULL,
    email character varying(255) NOT NULL,
    date_of_birth date NOT NULL,
    password character varying(255) NOT NULL,
    height numeric(4,2) NOT NULL,
    gender character varying(10) NOT NULL,
    diet_type character varying(255) NOT NULL,
    allergies text[]
);
    DROP TABLE public.usuario;
       public         heap    postgres    false            �            1259    16488    usuario_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuario_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.usuario_user_id_seq;
       public          postgres    false    215                        0    0    usuario_user_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.usuario_user_id_seq OWNED BY public.usuario.user_id;
          public          postgres    false    214            e           2604    16492    usuario user_id    DEFAULT     r   ALTER TABLE ONLY public.usuario ALTER COLUMN user_id SET DEFAULT nextval('public.usuario_user_id_seq'::regclass);
 >   ALTER TABLE public.usuario ALTER COLUMN user_id DROP DEFAULT;
       public          postgres    false    214    215    215            �          0    16489    usuario 
   TABLE DATA           �   COPY public.usuario (user_id, fullname, weight, email, date_of_birth, password, height, gender, diet_type, allergies) FROM stdin;
    public          postgres    false    215   V                  0    0    usuario_user_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.usuario_user_id_seq', 1, false);
          public          postgres    false    214            g           2606    16498    usuario usuario_email_key 
   CONSTRAINT     U   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_email_key UNIQUE (email);
 C   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_email_key;
       public            postgres    false    215            i           2606    16496    usuario usuario_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (user_id);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    215            �   �   x�]��n�0Eg�+4t�AQy����<ed�``I�"g��Wv�v"pA��k`_RV�|�!l�y��_��-���h4���=�C� �v��ה�۵!8E���e�>S���%�"����O����V��x�t��YJz�/�~ ��?���eqquXx��:�1�c�\��]�)F_��&=;mH���y������pk�����P�     