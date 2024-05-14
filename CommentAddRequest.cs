using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.CommentsRequests
{
    public class CommentAddRequest
    {
        [Required]
        [StringLength(50, MinimumLength = 1)]
        public string Subject { get; set; }

        [Required]
        [StringLength(3000, MinimumLength = 1)]
        public string Text { get; set; }

        public int ParentId { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public  int EntityType { get; set; }

        [Required]
        [Range(1, Int32.MaxValue)]
        public int EntityId { get; set; }


        public Boolean IsDeleted { get; set; }

    }
}
