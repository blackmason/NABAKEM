using NABAKEM.Models.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NABAKEM.Controllers
{
    public class AdminController : RootController
    {
        /// <summary>
        /// 관리자화면
        /// 요약화면
        /// </summary>
        /// <returns></returns>
        public ActionResult Summary()
        {
            return View();
        }

        /// <summary>
        /// 관리자화면
        /// 제품관리
        /// </summary>
        /// <returns></returns>
        public ActionResult Products(string id)
        {
            if ("List" == id)
            {
                return View("Product/List");
            }
            else if ("Add" == id)
            {
                return View("Product/Add");
            }
            else if ("Update" == id)
            {
                return View("Product/Update");
            }
            else
            {
                return RedirectToAction("Summary");
            }
        }
        

        /*
         * 메뉴관리
         * 메뉴전체보기
         */
        public ActionResult Menus(string id)
        {
            if ("List" == id)
            {
                MenuHelper helper = new MenuHelper();
                var result = helper.GetAllMenus();

                return View("Menu/List", result);
            }
            else
            {
                return RedirectToAction("Summary");
            }
        }

        /*
         * 메뉴관리
         * 클릭한 메뉴정보 가져오기
         * 코드
         */
        public JsonResult GetMenu(string code)
        {
            MenuHelper helper = new MenuHelper();
            var result = helper.GetMenu(code);
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        /*
         * 메뉴관리
         * 메뉴정보 수정
         * 코드, 이름, 부모코드, 주소, 권한, 사용여부
         */
        public void UpdateMenu(string code, string name, string parentCode, string url, string role, string enabled)
        {
            MenuHelper helper = new MenuHelper();
            helper.UpdateMenu(code, name, parentCode, url, role, enabled);
            return;
        }

        /*
         * 메뉴관리
         * 메뉴추가
         * 코드, 이름, 부모코드, 주소, 권한, 사용여부
         */
        public void AddMenu(string code, string name, string parentCode, string url, string role, string enabled)
        {
            MenuHelper helper = new MenuHelper();
            helper.AddMenu(code, name, parentCode, url, role, enabled);
            return;
        }

        /*
         * 게시판관리
         * 글 전체목록
         */
        public ActionResult GetAllArticle()
        {
            BoardHelper helper = new BoardHelper();
            var result = helper.GetAllArticle();
            return View("ArticleAll", result);
        }

        /*
         * 공지사항
         * 공지사항 추가
         * 모드
         */
        public ActionResult Notice(string mode)
        {
            if ("Write" == mode)
            {
                return RedirectToAction("Notice/Write", "BBS");
            }
            else
            {
                return RedirectToAction("Notice/List", "BBS");
            }
        }
    }
}
