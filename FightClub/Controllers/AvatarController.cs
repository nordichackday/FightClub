using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.Results;
using System.Web.Mvc;
using FightClub.Repository;
using FightClub.Repository.Implementation;

namespace FightClub.Controllers
{
    public class AvatarController : Controller
    {
        private readonly GameRepository _repositoy;

        public AvatarController()
        {
            _repositoy = new GameRepository();

        }


        public ActionResult Create(string id)
        {
            if (id != null)
            {
            
            _repositoy.AddAvatar(new avatar {name = id});
            return Content("OK");
        }
          return null;
        }
    }
}