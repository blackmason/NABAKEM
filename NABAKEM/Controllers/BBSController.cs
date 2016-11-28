using NABAKEM.Models.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NABAKEM.Controllers
{
    public class BbsController : RootController
    {
        private BoardHelper helper;
        private string url;

        /*
         * 뷰 액션
         * 공지사항
         * 요청모드, 글번호
         */
        public ActionResult Notice(string mode, string id)
        {
            string bbsId = "BBS_NOTICE";
            string addr = null;
            helper = new BoardHelper();

            if ("List" == mode)
            {
                addr = "Notice/List";
                var result = helper.GetAllContents();
                
                return View(addr, result);
            }
            else if ("Write" == mode)
            {
                addr = "Notice/Write";
                return View(addr);
            }
            else if("Detail" == mode && null != id)
            {
                var result = helper.GetContent(bbsId, id);
                addr = "Notice/Detail";
                return View(addr, result);
            }
            else
            {
                return View("Error");
            }
        }
        
        //제품문의
        public ActionResult QnA(string id)
        {
            if (id != null && id != "")
            {
                return View("QnA/Detail/" + id);
            }
            else
            {
                return View("QnA/List");
            }
        }

        //견적요청
        public ActionResult Estimate(string id)
        {
            if (id != null && id != "")
            {
                return View("Estimate/Detail/" + id);
            }
            else
            {
                return View("Estimate/List");
            }
        }

        /*
         * 데이터액션
         * 글 등록
         * 보드아이디, 제목, 내용, 작성자
         */
        [ValidateInput(false)]
        public ActionResult OnSubmit(string bbsId, string subject, string contents, string author)
        {
            helper = new BoardHelper();
            int result = helper.ContentAdd(bbsId, subject, contents, author);

            if (0 != result)
            {
                return RedirectToAction("Notice/List", "BBS");
            }
            else
            {
                return RedirectToAction("Notice/Write", "BBS");
            }
        }

        /*
         * 데이터액션
         * 글 수정
         * 보드아이디, 글번호, 제목, 내용
         */
        [ValidateInput(false)]
        public ActionResult Edit(string bbsId, string id, string subject, string contents)
        {
            helper = new BoardHelper();

            int result = helper.ContentEdit(bbsId, id, subject, contents);

            if (0 != result)
            {
                url = string.Format("{0}/View/{1}", id);
                return RedirectToAction(url, "Customer");
            }
            else
            {
                url = string.Format("{0}/View/{1}", id);
                return RedirectToAction(url, "Customer");
            }
        }
    }
}
