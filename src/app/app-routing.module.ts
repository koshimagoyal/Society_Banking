import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'cash-cheque',
        loadChildren: () =>
            import('./miscellaneous-page/miscellaneous-page.module').then(
                m => m.MiscellaneousPageModule
            ),
    },
    {
        path: 'bank-account',
        loadChildren: () =>
            import('./bank-account/bank-account.module').then(m => m.BankAccountModule),
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    },
    {
        path: 'add-corpus',
        loadChildren: () => import('./add-corpus/add-corpus.module').then(m => m.AddCorpusModule),
    },
    {
        path: 'loan-entry',
        loadChildren: () => import('./loan-entry/loan-entry.module').then(m => m.LoanEntryModule),
    },
    {
        path: 'emp-dashboard',
        loadChildren: () =>
            import('./emp-dashboard/emp-dashboard.module').then(m => m.EmpDashboardModule),
    },
    {
        path: 'loan-emi-calculator',
        loadChildren: () =>
            import('./loan-emi-calculator/loan-emi-calculator.module').then(
                m => m.LoanEmiCalculatorModule
            ),
    },
    {
        path: 'loan-eligibility-table',
        loadChildren: () =>
            import('./loan-eligibility-table/loan-eligibility-table.module').then(
                m => m.LoanEligibilityTableModule
            ),
    },
    {
        path: 'common',
        loadChildren: () => import('./app-common/app-common.module').then(m => m.AppCommonModule),
    },
    {
        path: 'apply-loan',
        loadChildren: () => import('./apply-loan/apply-loan.module').then(m => m.ApplyLoanModule),
    },
    {
        path: 'close-account',
        loadChildren: () =>
            import('./close-account/close-account.module').then(m => m.CloseAccountModule),
    },
    {
        path: 'credit-entry',
        loadChildren: () =>
            import('./credit-entry/credit-entry.module').then(m => m.CreditEntryModule),
    },
    {
        path: 'debit-entry',
        loadChildren: () =>
            import('./debit-entry/debit-entry.module').then(m => m.DebitEntryModule),
    },
    {
        path: 'excel-table',
        loadChildren: () =>
            import('./excel-table/excel-table.module').then(m => m.ExcelTableModule),
    },
    { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
    {
        path: 'expense',
        loadChildren: () => import('./expense/expense.module').then(m => m.ExpenseModule),
    },
    {
        path: 'fy-dividend-calculate',
        loadChildren: () =>
            import('./fy-dividend-calculate/fy-dividend-calculate.module').then(
                m => m.FyDividendCalculateModule
            ),
    },
    {
        path: 'generate-emi',
        loadChildren: () =>
            import('./generate-emi/generate-emi.module').then(m => m.GenerateEmiModule),
    },
    {
        path: 'generate-statement',
        loadChildren: () =>
            import('./generate-statement/generate-statement.module').then(
                m => m.GenerateStatementModule
            ),
    },
    {
        path: 'loan-foreclosure',
        loadChildren: () =>
            import('./loan-foreclosure/loan-foreclosure.module').then(m => m.LoanForeclosureModule),
    },
    {
        path: 'upload-all',
        loadChildren: () => import('./upload-all/upload-all.module').then(m => m.UploadAllModule),
    },
    {
        path: '**',
        pathMatch: 'full',
        loadChildren: () =>
            import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
