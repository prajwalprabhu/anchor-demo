use anchor_lang::prelude::*;

declare_id!("3SLWpmiJPJbLT4MfnitHHoAZyuayThJMuEmkfMcxeX2o");

#[program]
pub mod anchor_demo {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.counter = 0;
        Ok(())
    }
    pub fn increment(ctx: Context<Incriment>) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.counter += 1;
        Ok(())
    }
    pub fn decrement(ctx: Context<Decriment>) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        if my_account.counter > 0 {
            my_account.counter -= 1;
        }
        Ok(())
    }
    pub fn set(ctx: Context<Set>, val: u32) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.counter = val;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init,payer=user,space=8+8)]
    pub my_account: Account<'info, MyAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Incriment<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}
#[derive(Accounts)]
pub struct Decriment<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}
#[derive(Accounts)]
pub struct Set<'info> {
    #[account(mut)]
    pub my_account: Account<'info, MyAccount>,
}
#[account]
pub struct MyAccount {
    counter: u32,
}
