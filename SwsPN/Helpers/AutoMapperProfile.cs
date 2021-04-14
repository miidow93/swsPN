using AutoMapper;
using SwsPN.DTOs;
using SwsPN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SwsPN.Helpers
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<LoginDTO, Users>()
                .ForMember(dest => dest.IdRoleNavigation, opt => opt.Ignore())
                .ForMember(dest => dest.Email, opt => opt.Ignore());
            CreateMap<RegisterDTO, Users>()
                // .ForMember(dest => dest.Email, opt => opt.Ignore())
                .ForMember(dest => dest.Password, opt => opt.Ignore())
                .ForMember(dest => dest.Salt, opt => opt.Ignore());

        }
    }
}
