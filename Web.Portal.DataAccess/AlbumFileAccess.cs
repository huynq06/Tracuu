using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.DataAccess
{
    public class AlbumFileAccess : DataBase.DataProvider
    {
        private string SQL_SELECT = "select    jv.AlbumFileId,jv.IdMain,jv.CODE,jv.YEAR,"
                                            + "jv.FileName,"
                                            + "jv.FileServer,"

                                            + "jv.FileSize,"
                                            + "jv.FileType,"
                                             + "jv.FileWith,"
                                            + "jv.Created"
                                             + " from AlbumFile jv";
        public int Add(Layer.AlbumFile albumFile)
        {
            return CommandStore32("AlbumFile_Add",albumFile.IdMain, albumFile.CODE,albumFile.YEAR,
                                               albumFile.FileName,

                                               albumFile.FileServer,
                                                albumFile.FileSize,
                                                 albumFile.FileType,
                                               albumFile.FileWith,
                                               albumFile.Created);
        }

        public Layer.AlbumFile GetProperties(System.Data.IDataReader reader)
        {
            Layer.AlbumFile albumFile = new Layer.AlbumFile();
            albumFile.IdMain = Convert.ToInt32(GetValueField(reader, "IDMain", 0));
            albumFile.CODE = Convert.ToString(GetValueField(reader, "CODE", string.Empty));
            albumFile.YEAR = Convert.ToString(GetValueField(reader, "YEAR", string.Empty));
            albumFile.FileName = Convert.ToString(GetValueField(reader, "FileName", string.Empty));
            albumFile.FileServer = Convert.ToString(GetValueField(reader, "FileServer", string.Empty));

            albumFile.FileSize = Convert.ToInt32(GetValueField(reader, "FileSize", 0));
            albumFile.FileType = Convert.ToString(GetValueField(reader, "FileType", string.Empty));
            albumFile.FileWith = Convert.ToString(GetValueField(reader, "FileWith", string.Empty));

            albumFile.Created = GetValueDateTimeField(reader, "Created", albumFile.Created);
            return albumFile;
        }
        public Layer.AlbumFile GetById(int albumFileId)
        {
            using (System.Data.IDataReader reader = CommandScriptDataReader(string.Format(SQL_SELECT + " where AlbumFileId={0}", albumFileId)))
            {

                if (reader.Read())
                    return GetProperties(reader);

            }
            return new Layer.AlbumFile();
        }
        public IList<Layer.AlbumFile> GetAll(string CODE,string YEAR)
        {
            IList<Layer.AlbumFile> albums = new List<Layer.AlbumFile>();
            using (System.Data.IDataReader reader = CommandScriptDataReader(string.Format(SQL_SELECT + " where CODE='{0}' and YEAR='{1}'", CODE,YEAR)))
            {

                while (reader.Read())
                    albums.Add(GetProperties(reader));

            }
            return albums;
        }
        public IList<Layer.AlbumFile> GetAll(int ID,string CODE)
        {
            IList<Layer.AlbumFile> albums = new List<Layer.AlbumFile>();
            using (System.Data.IDataReader reader = CommandScriptDataReader(string.Format(SQL_SELECT + " where IDMain={0}", ID)))
            {

                while (reader.Read())
                    albums.Add(GetProperties(reader));

            }
            return albums;
        }
        public int Delete(int albumFileId)
        {
            return CommandScriptReturn(string.Format("delete from AlbumFile where AlbumFileId={0}", albumFileId));
        }
        public int Delete(string fileServer)
        {
            return CommandScriptReturn(string.Format("delete from AlbumFile where FileServer='{0}'", fileServer.Trim()));
        }
    }
}
