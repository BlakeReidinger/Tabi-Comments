USE [Tabi]
GO
/****** Object:  StoredProcedure [dbo].[CommentsDeleteById]    Script Date: 5/14/2024 3:19:10 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[CommentsDeleteById]
			@Id int

as
-- =============================================
-- Author: Blake Reidinger
-- Create date: 4/3/2024
-- Description: A soft delete proc, updating the @IsDeleted to True
-- Code Reviewer: Victor
-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer: Byron
-- Note: - Changed, 4/4/2024
-- =============================================

/*
Declare @Id int = 1

Execute [dbo].[CommentsDeleteById]
			@Id

select *
from dbo.comments

*/
BEGIN
Declare @IsDeleted bit = 1
UPDATE [dbo].[Comments]
SET [IsDeleted] = @IsDeleted

WHERE Id = @Id

END
GO
