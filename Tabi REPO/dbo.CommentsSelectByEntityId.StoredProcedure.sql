USE [Tabi]
GO
/****** Object:  StoredProcedure [dbo].[CommentsSelectByEntityId]    Script Date: 5/14/2024 3:19:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[CommentsSelectByEntityId]
			@EntityId int,
			@EntityTypeId int
as

/*
-- =============================================
-- Author: Blake Reidinger
-- Create date: 4/3/2024
-- Description: Selecting the EntityId and EntityTypeId from Comments Table
-- Code Reviewer: Victor
-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: Byron
-- Note: - Changed, 4/4/2024
-- =============================================

Declare @EntityId int = 2
Declare @EntityTypeId int = 2

Execute dbo.[CommentsSelectByEntityId] @EntityId, @EntityTypeId

*/

BEGIN

SELECT C.[Id]
      ,C.[Subject]
      ,C.[Text]
      ,C.[ParentId]
      ,ET.Id as [EntityTypeId]
	  ,ET.[Name] as [EntityName]
      ,C.[EntityId]
      ,C.[DateCreated]
      ,C.[DateModified]
      ,dbo.fn_GetUserJSON(C.Createdby) as CreatedBy
      ,C.[IsDeleted]
  FROM [dbo].[Comments] as C inner join dbo.EntityTypes as ET on C.EntityTypeId=ET.Id
  Where ([EntityId] = @EntityId AND [EntityTypeId] = @EntityTypeId)

END


GO
