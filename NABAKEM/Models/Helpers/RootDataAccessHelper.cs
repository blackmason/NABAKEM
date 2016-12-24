using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace NABAKEM.Models.Helpers
{
    public class RootDataAccessHelper
    {
        protected SqlConnection connection;
        protected SqlCommand command;
        protected SqlDataReader reader;
        protected string connectionString;

        public void SetConnectionString()
        {
            connectionString = "server=127.0.0.1;uid=sa;password=ThsdhqmCGSY!!;database=NABAKEM";
            //connectionString = "Data Source=(LocalDB)\\v11.0;AttachDbFilename=D:\\Workspace\\S_SCT\\Database\\SCT.mdf;Integrated Security=True;Connect Timeout=30";
        }
    }
}