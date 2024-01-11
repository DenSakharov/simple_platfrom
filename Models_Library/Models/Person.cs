﻿using Microsoft.AspNetCore.Identity;

namespace Models_Library.Models
{
    public class Person : IdentityUser<string>
    {
        public List<string> kit_of_access_to_areas { get; set; }
        public string Role { get; set; }
    }
}
