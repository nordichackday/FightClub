using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using FightClub.Models;
using Microsoft.Ajax.Utilities;

namespace FightClub.App_Start
{
    public static class AutoMapperInit
    {
        public static void Init()
        {
            Mapper.CreateMap<Repository.user, User>();
            Mapper.CreateMap<Repository.match, Match>()
                .ForMember(a => a.User2Move1, b => b.MapFrom(c => (Move?) c.user2move1))
                .ForMember(a => a.User2Move2, b => b.MapFrom(c => (Move?) c.user2move2))
                .ForMember(a => a.User2Move3, b => b.MapFrom(c => (Move?) c.user2move3));

            Mapper.CreateMap<Match, Repository.match>()
                .ForMember(a=> a.user, opt=>opt.Ignore())
                .ForMember(a=> a.user3, opt=>opt.Ignore());

#if DEBUG
            Mapper.AssertConfigurationIsValid();
#endif
        }
    }
}