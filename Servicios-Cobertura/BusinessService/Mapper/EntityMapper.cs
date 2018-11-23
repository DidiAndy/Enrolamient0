using BusinnesEntities;
using BusinessService.CoberturaServ;

using DataModel;
using DataModel.GenericRepository;
using Omu.ValueInjecter;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using BusinessService.CoberturaServ1;

namespace BussinessServices.Mappers
{
    public class EntityMapper
    {
        public static MapperInstance planMapper = createPlanMapper();
        public static MapperInstance titularMapper = createBancoMapper();
        public static MapperInstance tipoCuentaMapper = createTipoCuentaMapper();
        public static MapperInstance TitularMapper = createTitularMapper();
        public static MapperInstance TitularModeloMapper = createTitularModelMapper();
        public static MapperInstance DependientesMapper = createDependientesMapper();
        public static MapperInstance DependientesModeloMapper = createDependientesModelMapper();
        public static MapperInstance EmpresaMapper = createEmpresaMapper();
        public static MapperInstance ParentescoMapper = createParentescoMapper();
        public static MapperInstance ExcelTitMapper = createExcelTitMapper();
        public static MapperInstance ExcelDepMapper = createExcelDependienteMapper();

        private static MapperInstance createTitularMapper()
        {
            var mapper = new MapperInstance();
            mapper.AddMap<personaNatural , TitularEntity>(src =>
            {
                var res = new TitularEntity();
                res.InjectFrom(src);
                res.NoIdentificacion = src.identificacion;
                res.PrimerNombre = src.primerNombre;
                res.SegundoNombre = src.segundoNombre;
                res.PrimerApellido = src.apellidoPaterno;
                res.SegundoApellido = src.apellidoMaterno;
                res.Fecha_Nacimiento = src.fechaNacimiento;
                res.genero = src.sexo;
                return res;
            });
            mapper.AddMap<TitularEntity, personaNatural>(src =>
            {
                var res = new personaNatural();
                res.InjectFrom(src);
                res.identificacion = src.NoIdentificacion;
                res.primerNombre = src.PrimerNombre;
                res.segundoNombre = src.SegundoNombre;
                res.apellidoPaterno = src.PrimerApellido;
                res.apellidoMaterno = src.SegundoApellido;
                res.fechaNacimiento = src.Fecha_Nacimiento;
                res.sexo = src.genero;
                return res;
            });
            return mapper;
        }

        private static MapperInstance createTitularModelMapper()
        {
            var mapper = new MapperInstance();
            mapper.AddMap<Titular, TitularEntity>(src =>
            {
                var res = new TitularEntity();
                res.InjectFrom(src);
                res.sec_titular = src.sec_titular;
                res.NoIdentificacion = src.cedula_titular;
                res.PrimerNombre = src.primer_nombre;
                res.SegundoNombre = src.segundo_nombre;
                res.PrimerApellido = src.primer_apellido;
                res.SegundoApellido = src.segundo_apellido;
                res.sec_plan = src.sec_plan;
                res.valor_total = src.valor_total;
                res.sec_tipoCuenta = src.sec_tipoCuenta;
                res.noCuenta = src.noCuenta;
                res.div_pago = src.div_pago;
                res.sec_banco = src.sec_banco;
                res.sec_empresa = src.sec_empresa;
                res.Fecha_Nacimiento = src.fecha_Nacimiento;
                res.genero = src.genero;
                res.sec_tipoDoc = src.sec_tipoDoc;
                res.dependientes = new List<DependientesEntity>();
                if (src.Dependiente.Any())
                {
                    src.Dependiente.ToList().ForEach(elemento =>
                    {
                        res.dependientes.Add(createDependientesModelMapper().Map<Dependiente, DependientesEntity>(elemento));
                    });
                }
               
                return res;
            });
            mapper.AddMap<TitularEntity, Titular>(src =>
            {
                var res = new Titular();
                res.InjectFrom(src);
                res.sec_titular = src.sec_titular;
                res.cedula_titular = src.NoIdentificacion;
                res.primer_nombre = src.PrimerNombre;
                res.segundo_nombre = src.SegundoNombre;
                res.primer_apellido = src.PrimerApellido;
                res.segundo_apellido = src.SegundoApellido;
                res.sec_plan = src.sec_plan;
                res.valor_total = src.valor_total;
                res.sec_tipoCuenta = src.sec_tipoCuenta;
                res.noCuenta = src.noCuenta;
                res.div_pago = src.div_pago;
                res.sec_banco = src.sec_banco;
                res.sec_empresa = src.sec_empresa;
                res.fecha_Nacimiento = src.Fecha_Nacimiento;
                res.genero = src.genero;
                res.sec_tipoDoc = src.sec_tipoDoc;
              
                return res;
            });
            return mapper;
        }

        private static MapperInstance createDependientesMapper()
        {
            var mapper = new MapperInstance();
            mapper.AddMap<personaNatural, DependientesEntity>(src =>
            {
                var res = new DependientesEntity();
                res.InjectFrom(src);
                res.NoIdentificacion = src.identificacion;
                res.PrimerNombre = src.primerNombre;
                res.SegundoNombre = src.segundoNombre;
                res.PrimerApellido = src.apellidoPaterno;
                res.SegundoApellido = src.apellidoMaterno;
                res.Fecha_Nacimiento = src.fechaNacimiento;
                res.genero = src.sexo;
                return res;               
            });
            mapper.AddMap<DependientesEntity, personaNatural>(src =>
            {
                var res = new personaNatural();
                res.InjectFrom(src);
                res.identificacion = src.NoIdentificacion;
                res.primerNombre = src.PrimerNombre;
                res.segundoNombre = src.SegundoNombre;
                res.apellidoPaterno = src.PrimerApellido;
                res.apellidoMaterno = src.SegundoApellido;
                res.fechaNacimiento = src.Fecha_Nacimiento;
                res.sexo = src.genero;
                return res;
            });
            return mapper;
        }
        private static MapperInstance createDependientesModelMapper()
        {
            var mapper = new MapperInstance();
            mapper.AddMap<Dependiente, DependientesEntity>(src =>
            {
                var res = new DependientesEntity();
                res.InjectFrom(src);
                res.NoIdentificacion = src.cedula_dependiente;
                res.PrimerNombre = src.primer_nombre;
                res.SegundoNombre = src.segundo_nombre;
                res.PrimerApellido = src.primer_apellido;
                res.SegundoApellido = src.segundo_apellido;
                res.sec_parentesco = src.sec_parentesco;
                res.sec_titular = src.sec_titular;
                res.otro_paretesco = src.otro_paretesco;
                res.Fecha_Nacimiento = src.fecha_Nacimiento;
                res.genero = src.genero;
                return res;
            });
            mapper.AddMap<DependientesEntity, Dependiente>(src =>
            {
                var res = new Dependiente();
                res.InjectFrom(src);
                res.cedula_dependiente = src.NoIdentificacion;
                res.primer_nombre= src.PrimerNombre;
                res.segundo_nombre = src.SegundoNombre;
                res.primer_apellido = src.PrimerApellido;
                res.segundo_apellido = src.SegundoApellido;
                res.sec_parentesco = src.sec_parentesco;
                res.sec_titular = src.sec_titular;
                res.otro_paretesco = src.otro_paretesco;
                res.fecha_Nacimiento = src.Fecha_Nacimiento;
                res.genero = src.genero;
                return res;
            });
            return mapper;
        }
        private static MapperInstance createPlanMapper()
        {
            var mapper = new MapperInstance();
            mapper.AddMap<Plan, PlanEntity>(src =>
            {
                var res = new PlanEntity();
                res.InjectFrom(src);
                res.descripcion = src.descripcion;
                res.Valor = src.Valor;
                return res;
            });
            mapper.AddMap<PlanEntity, Plan>(src =>
            {
                var res = new Plan();
                res.InjectFrom(src);
                res.descripcion = src.descripcion;
                res.Valor = src.Valor;
                return res;
            });
            return mapper;
        }

        private static MapperInstance createBancoMapper()
        {
            var mapper = new MapperInstance();
            mapper.AddMap<Banco, BancoEntity>(src =>
            {
                var res = new BancoEntity();
                res.InjectFrom(src);
                res.descripcion = src.descripcion;
                return res;
            });
            mapper.AddMap<BancoEntity, Banco>(src =>
            {
                var res = new Banco();
                res.InjectFrom(src);
                res.descripcion = src.descripcion;
                return res;
            });
            return mapper;
        }
        private static MapperInstance createTipoCuentaMapper()
        {
            var mapper = new MapperInstance();
            mapper.AddMap<TipoCuenta, TipoCuentaEntity>(src =>
            {
                var res = new TipoCuentaEntity();
                res.InjectFrom(src);
                res.descripcion = src.descripcion;
                return res;
            });
            mapper.AddMap<TipoCuentaEntity, TipoCuenta>(src =>
            {
                var res = new TipoCuenta();
                res.InjectFrom(src);
                res.descripcion = src.descripcion;
                return res;
            });
            return mapper;
        }
        private static MapperInstance createEmpresaMapper()
        {
            var mapper = new MapperInstance();
            mapper.AddMap<Empresa, EmpresaEntity>(src =>
            {
                var res = new EmpresaEntity();
                res.InjectFrom(src);
                res.sec_empresa = src.sec_empresa;
                res.descripcion = src.descripcion;
                res.estado = src.estado;
                return res;
            });
            mapper.AddMap<EmpresaEntity, Empresa>(src =>
            {
                var res = new Empresa();
                res.InjectFrom(src);
                res.sec_empresa = src.sec_empresa;
                res.descripcion = src.descripcion;
                res.logotipo = src.logotipo;
                res.estado = src.estado;
                return res;
            });
            return mapper;
        }

        private static MapperInstance createParentescoMapper()
        {
            var mapper = new MapperInstance();
            mapper.AddMap<Parentesco, ParentescoEntity>(src =>
            {
                var res = new ParentescoEntity();
                res.InjectFrom(src);
                res.sec_parentesco = src.sec_parentesco;
                res.descripcion = src.descripcion;
                res.estado = src.estado;
                return res;
            });
            mapper.AddMap<ParentescoEntity, Parentesco>(src =>
            {
                var res = new Parentesco();
                res.InjectFrom(src);
                res.sec_parentesco = src.sec_parentesco;
                res.descripcion = src.descripcion;
                res.estado = src.estado;
                return res;
            });
            return mapper;
        }

        private static MapperInstance createExcelTitMapper()
        {
            var mapper = new MapperInstance();
            mapper.AddMap<Titular, ReportExcel>(src =>
            {
                var res = new ReportExcel();
                res.InjectFrom(src);
                res.TIPO_DE_REGISTRO = "1";
                res.PRIMER_APELLIDO = src.primer_apellido;
                res.SEGUNDO_APELLIDO = src.segundo_apellido;
                res.NOMBRES = src.primer_nombre + " " + src.segundo_nombre;
                res.FECHA_NAC = src.fecha_Nacimiento.ToShortDateString();
                if (src.genero ==70) {
                    res.GENERO = "F";
                }
                else { res.GENERO = "M"; }                              
                res.TIPO_DOC = src.sec_tipoDoc;
                res.NUMERO_DOC = src.cedula_titular;
                res.CATEGORIA = "2";
                res.COD_EMPRESA = 1;
                res.COD_CONDUCTO = "1";
                res.COD_TIPO_CTA_BCO = src.sec_tipoCuenta +""; 
                res.NRO_CTA_TARJ = src.noCuenta;
                res.TTIPO_DOC_TITULAR = "";
                res.NRO_DOC_TITULAR = "";
                res.COD_PARENTESCO = "";

                return res;
            });
            return mapper;
        }
        private static MapperInstance createExcelDependienteMapper()
        {
            var mapper = new MapperInstance();
            mapper.AddMap<Dependiente, ReportExcel>(src =>
            {
               
                var res = new ReportExcel();
                res.InjectFrom(src);
                res.TIPO_DE_REGISTRO = "2";
                res.PRIMER_APELLIDO = src.primer_apellido;
                res.SEGUNDO_APELLIDO = src.segundo_apellido;
                res.NOMBRES = src.primer_nombre + " " + src.segundo_nombre;
                res.FECHA_NAC = src.fecha_Nacimiento.ToShortDateString();
                if (src.genero == 70)
                {
                    res.GENERO = "F";
                }
                else { res.GENERO = "M"; }
                res.TIPO_DOC = src.sec_tipoDoc;
                res.COD_CONDUCTO = "";
                res.COD_TIPO_CTA_BCO = "";
                res.COD_PARENTESCO = src.sec_parentesco.ToString();
                res.NUMERO_DOC = src.cedula_dependiente;
                res.CATEGORIA = "2";

                return res;
            });
            return mapper;
        }
    }
}
