using BusinnesEntities;
using DataModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessService
{
    public interface IParentescoService
    {
        List<ParentescoEntity> GetParentesco();
    }
}
