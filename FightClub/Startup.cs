using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FightClub.Startup))]
namespace FightClub
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            
        }
    }
}
