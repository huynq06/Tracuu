using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Oracle.DataAccess.Client;
using System.Data;
using Web.Portal.Model.Models;
using Web.Portal.Common.ApiViewModel;
using System;

namespace Web.Portal.DataAccess
{
    public class MessageAccess : DataBase.OracleProvider
    {
        private FFMViewModel GetFFMProperties(OracleDataReader reader)
        {
            FFMViewModel ffm = new FFMViewModel();
            ffm.Created = GetValueDateTimeField(reader, "CREATED", ffm.Created);
            ffm.Description = Convert.ToString(GetValueField(reader, "REMARK", string.Empty));
            ffm.StatusMessage = ffm.Created.HasValue ? 1 : 0;
            ffm.URL = ffm.Created.HasValue ? Convert.ToString(GetValueField(reader, "URL", string.Empty)).Replace("%SHARE_DIR%", @"\\VM-SHARE\Hermes5Share\HL\") : "";
            return ffm;
        }
        private FSUViewModel GetFSUProperties(OracleDataReader reader)
        {
            FSUViewModel fsu = new FSUViewModel();
            fsu.Created = GetValueDateTimeField(reader, "CREATED", fsu.Created);
            fsu.Description = Convert.ToString(GetValueField(reader, "REMARK", string.Empty));
            fsu.StatusMessage = fsu.Created.HasValue ? 1 : 0;
            fsu.URL = fsu.Created.HasValue ? Convert.ToString(GetValueField(reader, "URL", string.Empty)).Replace("%SHARE_DIR%", @"\\VM-SHARE\Hermes5Share\HL\") : "";
            return fsu;
        }
        private FHLViewModel GetFHLProperties(OracleDataReader reader)
        {
            FHLViewModel fsu = new FHLViewModel();
            fsu.Created = GetValueDateTimeField(reader, "CREATED", fsu.Created);
            fsu.Description = Convert.ToString(GetValueField(reader, "REMARK", string.Empty));
            fsu.StatusMessage = fsu.Created.HasValue ? 1 : 0;
            fsu.URL = fsu.Created.HasValue ? Convert.ToString(GetValueField(reader, "URL", string.Empty)).Replace("%SHARE_DIR%", @"\\VM-SHARE\Hermes5Share\HL\") : "";
            return fsu;
        }
        private FWBViewModel GetFWBProperties(OracleDataReader reader)
        {
            FWBViewModel fsu = new FWBViewModel();
            fsu.Created = GetValueDateTimeField(reader, "CREATED", fsu.Created);
            fsu.StatusMessage = fsu.Created.HasValue ? 1 : 0;
            fsu.Description = Convert.ToString(GetValueField(reader, "REMARK", string.Empty));
            fsu.URL = fsu.Created.HasValue ? Convert.ToString(GetValueField(reader, "URL", string.Empty)).Replace("%SHARE_DIR%", @"\\VM-SHARE\Hermes5Share\HL\") : "";
            return fsu;
        }
        private NOAViewModel GetNOAProperties(OracleDataReader reader)
        {
            NOAViewModel fsu = new NOAViewModel();
            fsu.Created = GetValueDateTimeField(reader, "CREATED", fsu.Created);
            fsu.StatusMessage = fsu.Created.HasValue ? 1 : 0;
            fsu.Description = Convert.ToString(GetValueField(reader, "REMARK", string.Empty));
            fsu.URL = fsu.Created.HasValue ? Convert.ToString(GetValueField(reader, "URL", string.Empty)).Replace("%SHARE_DIR%", @"\\VM-SHARE\Hermes5Share\HL\") : "";
            return fsu;
        }
        public List<FFMViewModel> GetFFMDetail(string lagi_ident)
        {
            string sql = "select distinct m.mess_message_filename as URL,m.mess_message_datetime as CREATED, agen.agen_remarks as REMARK from VN_SHARE_HL.MESS_MESSAGES m " +
"inner join VN_SHARE_HL.MESG_MESSAGE_OBJECTS mmo on m.mess_message_isn = mmo.mesg_message_isn "+
"inner join lagi on lagi.lagi_fwbm_serial_no1 = mmo.mesg_object_isn " +
"inner join agen on lagi.lagi_ident_no = agen.agen_ident_no " +
"where lagi.lagi_ident_no = '" + lagi_ident + "' " +
"and m.mess_template = 'FFM' and agen.agen_status_external = 'FFM RECEIVED' order by m.mess_message_datetime desc";
            List<FFMViewModel> listffm = new List<FFMViewModel>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    listffm.Add(GetFFMProperties(reader));

                }
            }
            return listffm;
        }
        public List<FSUViewModel> GetFSUDetail(string lagi_ident)
        {
            string sql = "select distinct m.mess_message_filename as URL,m.mess_message_datetime as CREATED, agen.agen_remarks as REMARK from VN_SHARE_HL.MESS_MESSAGES m " +
"inner join VN_SHARE_HL.MESG_MESSAGE_OBJECTS mmo on m.mess_message_isn = mmo.mesg_message_isn " +
"inner join lagi on lagi.lagi_fwbm_serial_no1 = mmo.mesg_object_isn " +
"inner join agen on lagi.lagi_ident_no = agen.agen_ident_no " +
"where lagi.lagi_ident_no = '" + lagi_ident + "' " +
"and m.mess_template = 'FSU' and agen.agen_remarks = 'C2K:RCF Message has been sent Succesfully' order by m.mess_message_datetime desc";
            List<FSUViewModel> listffm = new List<FSUViewModel>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    listffm.Add(GetFSUProperties(reader));

                }
            }
            return listffm;
        }
        public List<FHLViewModel> GetFHLDetail(string lagi_ident)
        {
            string sql = "select agen.agen_creation_datetime as CREATED, agen.agen_remarks as REMARK from agen " +
                        "inner join lagi on lagi.lagi_ident_no = agen.agen_ident_no " +
"where lagi.lagi_ident_no = '" + lagi_ident + "' " +
"and agen.agen_status_external = 'FHL MESSAGE RECEIVED'  order by agen.agen_creation_datetime desc";
            List<FHLViewModel> listffm = new List<FHLViewModel>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    listffm.Add(GetFHLProperties(reader));

                }
            }
            return listffm;
        }
        public List<FWBViewModel> GetFWBDetail(string lagi_ident)
        {
          string sql = "select agen.agen_creation_datetime as CREATED, agen.agen_remarks as REMARK from agen " +
                        "inner join lagi on lagi.lagi_ident_no = agen.agen_ident_no " +
"where lagi.lagi_ident_no = '" + lagi_ident + "' " +
"and agen.agen_status_external = 'FWB UPDATE'  order by agen.agen_creation_datetime desc";
            List<FWBViewModel> listffm = new List<FWBViewModel>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    listffm.Add(GetFWBProperties(reader));

                }
            }
            return listffm;
        }
        public List<NOAViewModel> GetNOADetail(string lagi_ident)
        {
            string sql = "select agen.agen_creation_datetime as CREATED, agen.agen_remarks as REMARK from agen " +
                        "inner join lagi on lagi.lagi_ident_no = agen.agen_ident_no " +
"where lagi.lagi_ident_no = '" + lagi_ident + "' " +
"and agen.agen_status_external = 'NOTIFY OF DELIVERY'  order by agen.agen_creation_datetime desc";
            List<NOAViewModel> listffm = new List<NOAViewModel>();
            using (OracleDataReader reader = GetScriptOracleDataReader(sql))
            {
                while (reader.Read())
                {
                    listffm.Add(GetNOAProperties(reader));

                }
            }
            return listffm;
        }
    }
}
