USE [Tabi]
GO
/****** Object:  StoredProcedure [dbo].[CommentsUpdate]    Script Date: 5/14/2024 3:19:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[CommentsUpdate]
				@Subject nvarchar(50),
				@Text nvarchar(3000),
				@ParentId int,
				@EntityTypeId int,
				@EntityId int,				
				@IsDeleted bit,
				@Id int
			
as

/*

-- =============================================
-- Author: Blake Reidinger
-- Create date: 4/5/2024
-- Description: Update proc fror updating the Comments Table
-- Code Reviewer: Victor
-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: Byron
-- Note: - Changed, 4/4/2024
-- =============================================

 Declare @Id int = 1

    Declare @Subject nvarchar(50) = 'This is a update test'
            ,@Text nvarchar(3000) = 'This is some update text'
            ,@ParentId int = 2
            ,@EntityTypeId int = 2
            ,@EntityId int = 2
            ,@IsDeleted int = 2			         
      
    Execute dbo.CommentsUpdate
                @Subject,
                @Text,
                @ParentId,
                @EntityTypeId,
                @EntityId,
                @IsDeleted,
				@Id


*/
BEGIN

UPDATE [dbo].[Comments]
   SET 
      [Subject] = @Subject,
      [Text] = @Text,
      [ParentId] = @ParentId,
      [EntityTypeId] = @EntityTypeId,
      [EntityId] = EntityId,
      [IsDeleted] = IsDeleted
 WHERE Id = @Id
END


GO
