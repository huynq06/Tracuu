using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Web.Portal.Layer
{
    public class AlbumFile
    {
        public int AlbumFileId { get; set; }
        public int IdMain { get; set; }
        public string CODE { get; set; }
        public string YEAR { get; set; }

        public string FileName { get; set; }

        public string FileServer { get; set; }
        public int FileSize { get; set; }

        public string FileType { get; set; }
        public string FileWith { get; set; }

        public DateTime? Created { get; set; }
    }
}
