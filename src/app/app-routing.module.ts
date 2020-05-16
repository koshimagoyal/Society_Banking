import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/auth/login',
    },
    {
        path: 'charts',
        loadChildren: () =>
            import('modules/charts/charts-routing.module').then(m => m.ChartsRoutingModule),
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('modules/dashboard/dashboard-routing.module').then(
                m => m.DashboardRoutingModule
            ),
    },
    {
        path: 'emp-dashboard',
        loadChildren: () =>
            import('modules/emp-dashboard/emp-dashboard-routing.module').then(
                m => m.EmpDashboardRoutingModule
            ),
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('modules/auth/auth-routing.module').then(m => m.AuthRoutingModule),
    },
    {
        path: 'loan-emi-calculator',
        loadChildren: () =>
            import('modules/loan-emi-calculator/loan-emi-calculator-routing.module').then(
                m => m.LoanEmiCalculatorRoutingModule
            ),
    },
    {
        path: 'error',
        loadChildren: () =>
            import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    },
    {
        path: 'loan-eligibility-table',
        loadChildren: () =>
            import('modules/loan-eligibility-table/loan-eligibility-table-routing.module').then(
                m => m.LoanEligibilityTableRoutingModule
            ),
    },
    {
        path: 'tables',
        loadChildren: () =>
            import('modules/tables/tables-routing.module').then(m => m.TablesRoutingModule),
    },
    {
        path: 'version',
        loadChildren: () =>
            import('modules/utility/utility-routing.module').then(m => m.UtilityRoutingModule),
    },
    {
        path: 'generateStatement',
        loadChildren: () =>
            import('modules/generate-statement/generate-statement-routing.module').then(
                m => m.GenerateStatementRoutingModule
            ),
    },
    {
        path: 'closeAccount',
        loadChildren: () =>
            import('modules/close-account/close-account-routing.module').then(
                m => m.CloseAccountRoutingModule
            ),
    },
    {
        path: 'creditEntry',
        loadChildren: () =>
            import('modules/credit-entry/credit-entry-routing.module').then(
                m => m.CreditEntryRoutingModule
            ),
    },
    {
        path: 'debitEntry',
        loadChildren: () =>
            import('modules/debit-entry/debit-entry-routing.module').then(
                m => m.DebitEntryRoutingModule
            ),
    },
    {
        path: 'loanEntry',
        loadChildren: () =>
            import('modules/loan-entry/loan-entry-routing.module').then(
                m => m.LoanEntryRoutingModule
            ),
    },
    {
        path: 'foreclosure',
        loadChildren: () =>
            import('modules/loan-foreclosure/loan-foreclosure-routing.module').then(
                m => m.LoanForeclosureRoutingModule
            ),
    },
    {
        path: 'expense',
        loadChildren: () =>
            import('modules/expense/expense-routing.module').then(m => m.ExpenseRoutingModule),
    },
    {
        path: 'uploadAll',
        loadChildren: () =>
            import('modules/upload-all/upload-all-routing.module').then(
                m => m.UploadAllRoutingModule
            ),
    },
    {
        path: 'FyDividend',
        loadChildren: () =>
            import('modules/fy-dividend-calculate/fy-dividend-calculate-routing.module').then(
                m => m.FyDividendCalculateRoutingModule
            ),
    },
    {
        path: 'generateEMI',
        loadChildren: () =>
            import('modules/generate-emi/generate-emi-routing.module').then(
                m => m.GenerateEmiRoutingModule
            ),
    },
    {
        path: 'applyLoan',
        loadChildren: () =>
            import('modules/apply-loan/apply-loan-routing.module').then(
                m => m.ApplyLoanRoutingModule
            ),
    },
    {
        path: 'excelTable',
        loadChildren: () =>
            import('modules/excel-table/excel-table-routing.module').then(
                m => m.ExcelTableRoutingModule
            ),
    },
    {
        path: '**',
        pathMatch: 'full',
        loadChildren: () =>
            import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
