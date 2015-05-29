using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FightClub.Repository.Implementation;

namespace FightClub.Controllers
{
    public class AdminController : Controller
    {
        private GameRepository _repo;

        public AdminController()
        {
            _repo = new GameRepository();
        }
        // GET: Admin
        public ActionResult Index()
        {
           var model = _repo.GetMatches();
            return View(model);
        }
    }
}