using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.UI.WebControls;
using FightClub.Models;
using FightClub.Repository;
using FightClub.Repository.Implementation;

namespace FightClub.Controllers
{
  [RoutePrefix("Opponent")]
    public class OpponentController : ApiController
    {
        private GameRepository _repo;


        public OpponentController()
        {
            _repo = new GameRepository();
        }
       [Route("{username}")]
        [HttpGet]
        //Opponent/mfeh
        public User GetOpponentByUserName(string username)
        {
           return AutoMapper.Mapper.Map<User>(_repo.GetOpponent(username));
        }
        [Route("Random/{username}")]
        //Opponent/random/mfeh
        [HttpGet]
        public User GetRandomOpponent(string username)
        {
            return AutoMapper.Mapper.Map<User>(_repo.GetRandomOpponent(username));
        }
    }
}
