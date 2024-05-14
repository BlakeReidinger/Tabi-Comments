using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Build.Framework;
using Microsoft.Extensions.Logging;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System.Data.SqlClient;
using System;
using Sabio.Models.Domain.Comments;
using Sabio.Models.Requests.CommentsRequests;
using System.Collections.Generic;

namespace Sabio.Web.Api.Controllers.Comments
{
    [Route("api/comments")]
    [ApiController]
    public class CommentApiController : BaseApiController
    {
        private ICommentsService _service = null;
        private IAuthenticationService<int> _authService = null;


        public CommentApiController(ICommentsService service, 
            ILogger <CommentApiController> logger, IAuthenticationService<int> authService) : base(logger) 
        {
            _service = service;
            _authService = authService;

        }
        
        
        [HttpGet("{EntityId:int}/{EntityTypeId:int}")]
        public ActionResult<ItemResponse<List<Comment>>> GetByEntityId(int EntityId, int EntityTypeId)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {

                List<Comment> comments = _service.GetByEntityId(EntityId, EntityTypeId);

                if (comments == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Comment not Found");

                }
                else
                {
                    response = new ItemResponse<List<Comment>> { Item = comments };
                }

            }
            catch (SqlException sqlEx)
            {
                iCode = 500;

                response = new ErrorResponse($"SqlException: ${sqlEx.Message}");

                base.Logger.LogError(sqlEx.ToString());
            }
            catch (ArgumentException argEx)
            {
                iCode = 500;

                base.Logger.LogError(argEx.ToString());

                response = new ErrorResponse($"ArgumentException: ${argEx.Message}");
            }
            catch (Exception ex)
            {
                iCode = 500;

                base.Logger.LogError(ex.ToString());

                response = new ErrorResponse($"Generic Error: ${ex.Message}");

            }
            return StatusCode(iCode, response);

        }
        
        [HttpPost("")]
        public ActionResult<ItemResponse<int>> Create(CommentAddRequest request)
        {
            ObjectResult result = null;

            try
            {
                int authId = _authService.GetCurrentUserId();
                int id = _service.Add(request, authId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };


                result = Created201(response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }
            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(CommentUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _service.Update(model);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                _service.DeleteById(id);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);

            }

            return StatusCode(code, response);
        }


    }
}
