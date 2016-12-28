using NABAKEM.Models.Domains;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace NABAKEM.Models.Helpers
{
    public class BoardHelper : RootDataAccessHelper
    {
        // 게시물 리스트
        public List<Boards> GetAllContents()
        {
            string sql = "NOTICE_LIST_USP";

            SetConnectionString();
            List<Boards> bbsList = new List<Boards>();
            Boards bbs;
            using (connection = new SqlConnection(connectionString))
            {
                connection.Open();
                command = new SqlCommand(sql, connection);
                command.CommandType = CommandType.StoredProcedure;

                reader = command.ExecuteReader();

                while (reader.Read())
                {
                    bbs = new Boards();
                    bbs.No = reader[0].ToString();
                    bbs.Category = reader[1].ToString();
                    bbs.Fixed = reader[2].ToString();
                    bbs.Subject = reader[3].ToString();
                    bbs.Author = reader[4].ToString();
                    bbs.InsertDate = reader[5].ToString();
                    bbs.Hit = reader[6].ToString();
                    bbsList.Add(bbs);
                }
                connection.Close();
            }

            return bbsList;
        }

        // 게시물 보기
        public Boards GetContent(string bbsId, string id)
        {
            string sql = null;

            switch (bbsId)
            {
                case "BBS_NOTICE":
                    sql = "NOTICE_DETAIL_USP";
                    break;
                case "BBS_QNA":
                    sql = "QNA_DETAIL_USP";
                    break;
                case "BBS_ESTIMATE":
                    sql = "ESTIMATE_DETAIL_USP";
                    break;
            }

            SetConnectionString();
            Boards bbs = new Boards();
            using (connection = new SqlConnection(connectionString))
            {
                connection.Open();
                command = new SqlCommand(sql, connection);
                command.CommandType = CommandType.StoredProcedure;
                command.Parameters.AddWithValue("@SEQ", id);
                reader = command.ExecuteReader();

                if (reader.Read())
                {
                    bbs.No = reader[0].ToString();
                    bbs.Subject = reader[1].ToString();
                    bbs.Contents = reader[2].ToString();
                    bbs.Author = reader[3].ToString();
                    bbs.InsertDate = reader[4].ToString();
                    bbs.Hit = reader[5].ToString();
                }
                connection.Close();
            }

            return bbs;
        }

        // 게시물 입력
        public int ContentAdd(string bbsId, string subject, string contents, string author)
        {
            //string revContents = contents.Replace("'", "''");
            string sql = string.Format("INSERT INTO {0} (SUBJECT, CONTENTS, AUTHOR) VALUES ('{1}','{2}','{3}')", bbsId, subject, contents, author);

            int result;
            SetConnectionString();
            using (connection = new SqlConnection(connectionString))
            {
                connection.Open();
                command = new SqlCommand(sql, connection);
                result = command.ExecuteNonQuery();
                connection.Close();
            }

            return result;
        }

        public int ContentEdit(string bbsId, string id, string subject, string contents)         //업데이트문으로 교체
        {
            string tblName = ReturnTblName(bbsId);
            string sql = string.Format("UPDATE {0} SET SUBJECT = '{1}', CONTENTS = '{2}' WHERE SEQ = '{3}'", tblName, subject, contents, id);
            //string sql = "NOTICE_USP";

            int result;
            Boards bbs = new Boards();
            SetConnectionString();
            using (connection = new SqlConnection(connectionString))
            {
                connection.Open();
                command = new SqlCommand(sql, connection);
                result = command.ExecuteNonQuery();
                connection.Close();
            }

            return result;
        }

        // 게시물 삭제
        public int DeleteContents(string bbsId, string id)
        {
            string tblName = ReturnTblName(bbsId);
            string sql = string.Format("DELETE FROM {0} WHERE SEQ = {1}", tblName, id);

            int result;
            SetConnectionString();
            using (connection = new SqlConnection(connectionString))
            {
                connection.Open();
                command = new SqlCommand(sql, connection);
                result = command.ExecuteNonQuery();
                connection.Close();
            }

            return result;
        }

        //public List<Board> SummaryData(string bbsId)
        //{
        //    string tblName = ReturnTblName(bbsId);
        //    string sql = string.Format("SELECT TOP 5 SUBJECT, CONVERT(CHAR(10), CREATED, 120) FROM {0} ORDER BY CREATED DESC", tblName);

        //    List<Board> bbsList = new List<Board>();
        //    Board bbs;
        //    SetConnectionString();
        //    using (connection = new SqlConnection(connectionString))
        //    {
        //        connection.Open();
        //        command = new SqlCommand(sql, connection);
        //        reader = command.ExecuteReader();

        //        while (reader.Read())
        //        {
        //            bbs = new Board();
        //            bbs.Subject = reader[0].ToString();
        //            bbs.InsertDate = reader[1].ToString();
        //            bbsList.Add(bbs);
        //        }
        //        connection.Close();
        //    }

        //    return bbsList;
        //}

        public string ReturnTblName(string bbsId)
        {
            string tblName;

            if (" " == bbsId)           // 추후 수정 필요
            {
                tblName = "BBS_NOTICE";
                return tblName;
            }
            else
            {
                return "BBS_NOTICE";
            }
        }

        public List<Boards> GetAllArticle()
        {
            string sql = "ARTICLE_ALL_USP";

            Boards board;
            List<Boards> bbsList = new List<Boards>();
            SetConnectionString();
            using (connection = new SqlConnection(connectionString))
            {
                connection.Open();
                command = new SqlCommand(sql, connection);
                reader = command.ExecuteReader();

                while (reader.Read())
                {
                    board = new Boards();
                    board.Bbs = reader[0].ToString();
                    board.Category = reader[1].ToString();
                    board.Subject = reader[2].ToString();
                    board.Contents = reader[3].ToString();
                    board.Author = reader[4].ToString();
                    board.InsertDate = reader[5].ToString();
                    board.Hit = reader[6].ToString();
                    bbsList.Add(board);
                }
                connection.Close();
            }

            return bbsList;
        }
    }
}