USE [Tabi]
GO
/****** Object:  StoredProcedure [dbo].[Comments_Insert]    Script Date: 5/14/2024 3:19:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[Comments_Insert]
				@Subject nvarchar(50),
				@Text nvarchar(3000),
				@ParentId int,
				@EntityTypeId int,
				@EntityId int,
				@CreatedBy int,
				@IsDeleted bit,
				@Id int OUTPUT

/*
-- =============================================
-- Author: Blake Reidinger
-- Create date: 4/3/2024
-- Description: Creating the insert Proc Comments table. 
-- Code Reviewer: Victor
-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: 
-- Note: 
-- =============================================

Declare @Id int = 1

    Declare @Subject nvarchar(50) = 'This is test 2'
            ,@Text nvarchar(3000) = 'This is test 2'
            ,@ParentId int = 2
            ,@EntityTypeId int= 2
            ,@EntityId int = 2
            ,@CreatedBy int = 1
            ,@IsDeleted bit = 1

    Execute dbo.Comments_Insert
                @Subject
                ,@Text
                ,@ParentId
                ,@EntityTypeId
                ,@EntityId
                ,@CreatedBy
                ,@IsDeleted
                ,@Id OUTPUT

*/
AS
BEGIN




INSERT INTO [dbo].[Comments]
           (
           [Subject]
           ,[Text]
           ,[ParentId]
           ,[EntityTypeId]
           ,[EntityId]
		   ,[CreatedBy]
		   ,[IsDeleted]
           )

     VALUES
           (@Subject,
				@Text,
				@ParentId,
				@EntityTypeId,
				@EntityId,
				@CreatedBy,
				@IsDeleted
				)

SET @Id = SCOPE_IDENTITY()
END


GO
